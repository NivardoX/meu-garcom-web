/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Button, Icon, Text, VStack } from '@chakra-ui/react'
import { Table } from '../../../@types/Restaurant/tables'
import { Chart } from '../../../components/Chart'
import { api } from '../../../service/apiClient'
import { useAppToast } from '../../../hooks/useAppToast'
import { useState, useEffect } from 'react'
import QRCode from 'qrcode.react'
import { Modal } from '../../../components/Modal'
import { useLocation } from 'react-router-dom'
import { Accordion } from './components/Accordion'
import { ButtonStatusOrder } from './components/ButtonStatusOrder'
import { RequestContent } from './components/RequestContent'
import { RequestBox } from './components/RequestBox'
import { useTables } from '../../../hooks/useTables'
import { EmptyState } from '../../../components/EmptyState'
import { RxDashboard, RxPerson } from 'react-icons/rx'
import { useAuth } from '../../../hooks/useAuth'
import { OrderProducts } from '../../../@types/Restaurant/orderProducts'

type TableOrderProps = {
  tableId: Table['id']
}
type WaiterProps = {
  id: string
  name: string
  username: string
  restaurantId: string
}

export function TableOrder() {
  const { handleRequestSuccess, handleRequestError } = useAppToast()
  const location = useLocation()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [session, setSession] = useState<boolean>(false)
  const [isModalPaymentOpen, setIsModalPaymentOpen] = useState<boolean>(false)
  const [isModalWaiterOpen, setIsModalWaiterOpen] = useState<boolean>(false)
  const { tableId }: TableOrderProps = location.state
  const { tables, fetchAllTables } = useTables()
  const { restaurantSession } = useAuth()
  const [waiter, setWaiter] = useState<WaiterProps[]>([])

  const table = tables.find((table) => table.id === tableId)
  if (!table) {
    return <></>
  }

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
  async function handleAssignWaiterToTable(id: string, name: string) {
    try {
      const response = await api.patch(`/tables/${tableId}/waiter`, {
        waiterId: id,
        restaurantManagerId: restaurantSession?.id,
      })
      if (response.status === 200) {
        handleRequestSuccess(
          `Garçom ${name} foi delegado a mesa ${table?.number}!`,
        )
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
          onClick={() => handleAssignWaiterToTable(item.id, item.name)}
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

  async function handleRemoveTable() {
    console.log(table?.tableSession?.id)
    try {
      const response = await api.patch(
        `/table-sessions/${table?.tableSession?.id}/finish`,
      )
      if (response.status === 200) {
        handleRequestSuccess('Mesa removida!')
      }
    } catch (error: any) {
      console.log(error)
      if (error.response.data.message[0] === 'tableSessionId must be a UUID') {
        console.log(error.response.data.message[0])
        handleRequestError('error', 'A mesa não tem sessão ativa!')
      } else {
        handleRequestError(error)
      }
    } finally {
      setIsModalOpen(false)
      setSession(false)
    }
  }
  const downloadQR = () => {
    const canvas: any = document.getElementById('123456')
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream')
    const downloadLink = document.createElement('a')
    downloadLink.href = pngUrl
    downloadLink.download = 'QrCode.png'
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }
  useEffect(() => {
    if (table?.tableSession?.status === `REQUESTED_PAYMENT`) {
      setIsModalPaymentOpen(true)
    }
    if (table?.tableSession) {
      setSession(true)
    } else {
      setSession(false)
    }
    getAllWaiters()
  }, [table.tableSession])
  return (
    <Box w="100%" display="flex">
      <Chart
        headingTitle={`Mesa : ${table.number}`}
        hasCreateButton={false}
        openModal={() => setIsModalOpen(true)}
        onPress={handleRemoveTable}
      >
        {!table.tableSession && !session ? (
          <EmptyState
            description={false}
            title="Esta mesa não possui uma sessão ativa."
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
          table.tableSession?.orders.map((order: any, orderIndex: any) => {
            return (
              <Accordion key={orderIndex} title={`Pedido #${order.id}`}>
                {order.products.map(
                  (product: OrderProducts, productIndex: number) => {
                    return (
                      <RequestBox key={productIndex}>
                        <RequestContent
                          requestProductName={product.name}
                          requestProductStatus={product.status}
                          requestProductImage={product.imageUrl}
                        />
                        <ButtonStatusOrder
                          requestStatus={product.status}
                          productId={product.id}
                          orderId={order.id}
                        />
                      </RequestBox>
                    )
                  },
                )}
              </Accordion>
            )
          })
        )}
        {table.waiterId === null && (
          <VStack mt={25}>
            <EmptyState
              description={false}
              heigth={200}
              garçom
              atrelar={() => {
                setIsModalWaiterOpen(true)
              }}
              title="Esta mesa não possui um Garçom responsável."
              icon={
                <Icon
                  as={RxPerson}
                  boxSize={20}
                  color="gray.300"
                  marginBottom={5}
                />
              }
            />
          </VStack>
        )}
      </Chart>
      <Modal
        isOpen={isModalOpen}
        title={`QrCode Mesa : ${table.number}`}
        onClose={() => setIsModalOpen(false)}
        buttonTitle="Download"
        onClick={downloadQR}
      >
        <QRCode
          value={JSON.stringify({ tableId: table.id })}
          id="123456"
          size={250}
          bgColor="#FFFFFF"
          fgColor="#000000"
        />
      </Modal>
      <Modal
        isOpen={isModalPaymentOpen}
        title={`Pagamento Solicitado`}
        onClose={() => setIsModalPaymentOpen(false)}
        buttonTitle="Fechar"
        onClick={undefined}
      />
      <Modal
        isOpen={isModalWaiterOpen}
        title={`Escolha o Garçom`}
        onClose={() => setIsModalWaiterOpen(false)}
        buttonTitle="Fechar"
        onClick={undefined}
      >
        <WaiterList />
      </Modal>
    </Box>
  )
}
