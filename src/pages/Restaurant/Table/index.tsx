import { Box, Flex, Icon } from '@chakra-ui/react'
import { Table as TableComponent } from './components/Table'
import { Chart } from '../../../components/Chart'
import { api } from '../../../service/apiClient'
import { useEffect, useState } from 'react'
import { Table as TableType } from '../../../@types/Restaurant/tables'
import { useAppToast } from '../../../hooks/useAppToast'
import { Modal } from '../../../components/Modal'
import { useNavigate } from 'react-router-dom'
import { useTables } from '../../../hooks/useTables'
import { EmptyState } from '../../../components/EmptyState'
import { RxDashboard } from 'react-icons/rx'
import { Loading } from '../../../components/Loading'

// TODO: ao criar uma nova mesa, chamar a atualização de mesas

export function Table() {
  const navigate = useNavigate()
  const {
    tables,
    fetchAllTables,
    fetchingTables,
    setWaiterCalled,
    setNewOrder,
  } = useTables()
  const { handleRequestError, handleRequestSuccess } = useAppToast()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [, setLoadingTables] = useState<boolean>(false)

  const handleCreateTable = async () => {
    setLoadingTables(true)
    try {
      const response = await api.post('/tables')
      if (response.status === 201) {
        handleRequestSuccess('Nova mesa criada!')
        fetchAllTables()
      }
    } catch (error) {
      handleRequestError(error)
    } finally {
      setLoadingTables(false)
      setIsModalOpen(false)
    }
  }

  function handleOpenTable(tableId: TableType['id']) {
    navigate('/restaurant/table/order', { state: { tableId } })
    setWaiterCalled(false)
    setNewOrder(false)
  }

  useEffect(() => {
    fetchAllTables()
  }, [])

  if (fetchingTables) {
    return <Loading />
  }
  return (
    <Box w="100%">
      <Chart headingTitle="Mesas" onPress={() => setIsModalOpen(true)}>
        {tables.length === 0 ? (
          <EmptyState
            title="Você não possui Mesas criadas para listagem..."
            icon={
              <Icon
                as={RxDashboard}
                boxSize={20}
                color="gray.300"
                marginBottom={5}
              />
            }
          />
        ) : (
          <Flex flexWrap="wrap" gap="20px">
            {tables.map((table, tableIndex) => {
              return (
                <TableComponent
                  key={tableIndex}
                  table={table}
                  onPress={() => handleOpenTable(table.id)}
                />
              )
            })}
          </Flex>
        )}
      </Chart>
      <Modal
        isOpen={isModalOpen}
        title="Criar Mesa"
        onClose={() => setIsModalOpen(false)}
        onClick={handleCreateTable}
      />
    </Box>
  )
}
