import { Box, Icon } from '@chakra-ui/react'
import { Chart } from '../../../components/Chart'
import { ChartContent } from '../../../components/ChartContent/ChartContent'
import {
  ChartItems,
  ChartItemsProperty,
} from '../../../components/ChartItems/ChartItems'
import { api } from '../../../service/apiClient'
import { useEffect, useState } from 'react'
import { useAppToast } from '../../../hooks/useAppToast'
import { EmptyState } from '../../../components/EmptyState'
import { TbTie } from 'react-icons/tb'
import { Loading } from '../../../components/Loading'
import { useNavigate } from 'react-router-dom'

type GetWaiterResponse = {
  waiters: [
    {
      id: string
      name: string
      username: string
      restaurantId: string
    },
  ]
}

type WaiterProps = {
  id: string
  name: string
  username: string
  restaurantId: string
}

const chartProperty: ChartItemsProperty<WaiterProps> = {
  name: { label: 'Nome', format: 'text' },
}

export function Waiter() {
  const navigate = useNavigate()
  const { handleRequestError, handleRequestSuccess } = useAppToast()
  const [waiter, setWaiter] = useState<WaiterProps[]>([])
  const [loadingWaiters, setLoadingWaiters] = useState<boolean>(false)

  async function getAllWaiters() {
    setLoadingWaiters(true)
    try {
      const response = await api.get<GetWaiterResponse>(`/waiters?page=1`)
      const waiters: WaiterProps[] = response.data.waiters
      setWaiter(waiters)
    } catch (error) {
      handleRequestError(error)
    } finally {
      setLoadingWaiters(false)
    }
  }

  const handleRemoveWaiter = async (waiterId: string) => {
    try {
      const response = await api.delete(`/waiters/${waiterId}`)

      if (response.status === 204) {
        handleRequestSuccess('Colaborador removido com sucesso!')
        getAllWaiters()
      }
    } catch (error) {
      handleRequestError(error)
    }
  }

  const handleOpenUpdateWaiter = (waiter: WaiterProps) => {
    navigate('/restaurant/waiter/update', { state: { waiter } })
  }

  useEffect(() => {
    getAllWaiters()
  }, [])

  return (
    <Box w="100%">
      <Chart headingTitle="Garçons" href="/restaurant/waiter/create">
        {loadingWaiters ? (
          <Loading />
        ) : waiter.length === 0 ? (
          <EmptyState
            title="Você não possui Garçons criados para à listagem..."
            icon={
              <Icon as={TbTie} boxSize={20} color="gray.300" marginBottom={5} />
            }
          />
        ) : (
          <ChartContent headers={chartProperty}>
            {waiter.map((waiter, waiterIndex) => {
              return (
                <ChartItems
                  values={chartProperty}
                  data={waiter}
                  key={waiterIndex}
                  onEdit={() => handleOpenUpdateWaiter(waiter)}
                  onRemove={() => handleRemoveWaiter(waiter.id)}
                />
              )
            })}
          </ChartContent>
        )}
      </Chart>
    </Box>
  )
}
