import { Box, Button, Flex, Icon, Text, VStack } from '@chakra-ui/react'
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
import { useAuth } from '../../../hooks/useAuth'

// TODO: ao criar uma nova mesa, chamar a atualização de mesas
type WaiterProps = {
  id: string
  name: string
  username: string
  restaurantId: string
}

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
  const [lastTableCreated, setLastTableCreated] = useState('')
  const [, setLoadingTables] = useState<boolean>(false)
  const [isModalWaiterOpen, setIsModalWaiterOpen] = useState<boolean>(false)
  const [waiter, setWaiter] = useState<WaiterProps[]>([])
  const { restaurantSession } = useAuth()

  async function getAllWaiters() {
    try {
      console.log(restaurantSession)

      const response = await api.get<WaiterProps[]>(
        `/restaurant-manager/waiters/${restaurantSession?.restaurantId}`,
      )
      const waiters: WaiterProps[] = response.data
      setWaiter(waiters)
    } catch (error) {
      handleRequestError(error)
    }
  }
  const handleCreateTable = async () => {
    setLoadingTables(true)
    try {
      const response = await api.post('/tables')
      if (response.status === 201) {
        handleRequestSuccess('Nova mesa criada!')
        fetchAllTables()
        getAllWaiters()
        setLastTableCreated(response.data.table.id)
        setIsModalWaiterOpen(true)
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
  async function handleAssignWaiterToTable(
    id: string,
    name: string,
    tableId: string,
  ) {
    try {
      const response = await api.patch(`/tables/${tableId}/waiter`, {
        waiterId: id,
        restaurantManagerId: restaurantSession?.id,
      })
      if (response.status === 200) {
        handleRequestSuccess(`Garçom ${name} foi delegado a mesa com sucesso!`)
        fetchAllTables()
        setIsModalWaiterOpen(false)
      }
    } catch (error) {
      handleRequestError(error)
    }
  }
  const WaiterList = () => (
    <VStack w={'100%'}>
      {waiter.map((item, key) => (
        <Button
          key={key}
          onClick={() =>
            handleAssignWaiterToTable(item.id, item.name, lastTableCreated)
          }
          colorScheme="gray"
          style={{
            width: '100%',
          }}
        >
          <Text color="black">{item.name}</Text>
        </Button>
      ))}
    </VStack>
  )
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
      >
        <Box
          display="flex"
          backgroundColor="white"
          borderRadius={15}
          width={24}
          height={24}
          flexDirection="column"
          alignItems="center"
        >
          <Box
            display="flex"
            backgroundColor={'green'}
            width="100%"
            height={8}
            borderTopRadius={15}
            justifyContent="center"
            alignItems="center"
          >
            <Text color="white" fontWeight="bold" alignSelf="center">
              Mesa
            </Text>
          </Box>
          <Text color="black" fontWeight="bold" fontSize={34} marginTop={1}>
            {tables.length + 1}
          </Text>
        </Box>
      </Modal>
      <Modal
        isOpen={isModalWaiterOpen}
        title={`Escolha o Garçom responsável`}
        onClose={() => setIsModalWaiterOpen(false)}
        buttonTitle="Escolher Depois"
        onClick={() => setIsModalWaiterOpen(false)}
      >
        <WaiterList />
      </Modal>
    </Box>
  )
}
