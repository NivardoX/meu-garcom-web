import { Box, Icon } from '@chakra-ui/react'
import { Chart } from '../../../components/Chart'
import { ChartContent } from '../../../components/ChartContent/ChartContent'
import {
  ChartItems,
  ChartItemsProperty,
} from '../../../components/ChartItems/ChartItems'
import { useEffect, useState } from 'react'
import { api } from '../../../service/apiClient'
import { useAppToast } from '../../../hooks/useAppToast'
import { EmptyState } from '../../../components/EmptyState'
import { RxPerson } from 'react-icons/rx'
import { Loading } from '../../../components/Loading'

type GetEmployeePropsResponse = {
  restaurantManagers: [
    {
      id: string
      name: string
      username: string
      restaurantId: string
      isOwner: boolean
      createdAt: Date
    },
  ]
}

type EmployeeProps = {
  id: string
  name: string
  username: string
  restaurantId: string
  isOwner: boolean
  createdAt: Date
}

const chartProperty: ChartItemsProperty<EmployeeProps> = {
  name: { label: 'Colaboradores', format: 'text' },
  createdAt: { label: 'Data de criação', format: 'date' },
}

export function Employee() {
  const { handleRequestError, handleRequestSuccess } = useAppToast()
  const [employee, setEmployee] = useState<EmployeeProps[]>([])
  const [loadingEmployees, setLoadingEmployees] = useState<boolean>(false)

  async function getAllEmployee() {
    setLoadingEmployees(true)
    try {
      const response = await api.get<GetEmployeePropsResponse>(
        `/restaurant-manager?page=1`,
      )
      const employees: EmployeeProps[] = response.data.restaurantManagers
      setEmployee(employees)
    } catch (error) {
      handleRequestError(error)
    } finally {
      setLoadingEmployees(false)
    }
  }

  const handleRemoveEmployee = async (restaurantManagerId: string) => {
    try {
      const response = await api.delete(
        `/restaurant-manager/${restaurantManagerId}`,
      )

      if (response.status === 204) {
        handleRequestSuccess('Colaborador removido com sucesso!')
        getAllEmployee()
      }
    } catch (error) {
      handleRequestError(error)
    }
  }

  useEffect(() => {
    getAllEmployee()
  }, [])

  return (
    <Box w="100%">
      <Chart headingTitle="Colaboradores" href="/restaurant/employee/create">
        {loadingEmployees ? (
          <Loading />
        ) : employee.length === 0 ? (
          <EmptyState
            title="Você não possui Colaboradores criados para listagem..."
            icon={
              <Icon
                as={RxPerson}
                boxSize={20}
                color="gray.300"
                marginBottom={5}
              />
            }
          />
        ) : (
          <ChartContent headers={chartProperty}>
            {employee.map((employee, employeeIndex) => {
              return (
                <ChartItems
                  values={chartProperty}
                  data={employee}
                  key={employeeIndex}
                  onRemove={() => handleRemoveEmployee(employee.id)}
                />
              )
            })}
          </ChartContent>
        )}
      </Chart>
    </Box>
  )
}
