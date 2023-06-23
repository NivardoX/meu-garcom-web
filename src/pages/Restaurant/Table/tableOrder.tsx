import { Box, Icon } from '@chakra-ui/react'
import { Table } from '../../../@types/Restaurant/tables'
import { Chart } from '../../../components/Chart'
import { api } from '../../../service/apiClient'
import { useAppToast } from '../../../hooks/useAppToast'
import { useState, useEffect } from 'react'
import QRCode from 'react-qr-code'
import { Modal } from '../../../components/Modal'
import { useLocation } from 'react-router-dom'
import { Accordion } from './components/Accordion'
import { ButtonStatusOrder } from './components/ButtonStatusOrder'
import { RequestContent } from './components/RequestContent'
import { RequestBox } from './components/RequestBox'
import { useTables } from '../../../hooks/useTables'
import { EmptyState } from '../../../components/EmptyState'
import { RxDashboard } from 'react-icons/rx'

type TableOrderProps = {
  tableId: Table['id']
}

export function TableOrder() {
  const { handleRequestSuccess, handleRequestError } = useAppToast()
  const location = useLocation()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isModalPaymentOpen, setIsModalPaymentOpen] = useState<boolean>(false)
  const { tableId }: TableOrderProps = location.state
  const { tables } = useTables()

  const table = tables.find((table) => table.id === tableId)

  if (!table) {
    return <></>
  }

  // async function handleAssignWaiterToTable() {
  //   try {
  //     const response = await api.patch(`/tables/${tableId}/waiter`, {
  //       waiterId: tableId,
  //     })
  //     if (response.status === 201) {
  //       handleRequestSuccess(
  //         `Garçom ${table.tableSession.waiter} foi delegado a mesa ${table.number}!`,
  //       )
  //     }
  //   } catch (error) {
  //     handleRequestError(error)
  //   }
  // }

  async function handleRemoveTable() {
    console.log(table?.tableSession?.id);
    try {
      const response = await api.patch(`/table-sessions/${table?.tableSession?.id}/finish`)
      if (response.status === 200) {
        handleRequestSuccess('Mesa removida!')
        
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.data.message[0] === 'tableSessionId must be a UUID') {
        console.log(error.response.data.message[0]);
        handleRequestError('error', 'A mesa não tem sessão ativa!')


      } else {

        handleRequestError(error)
      }
    } finally {
      setIsModalOpen(false)
    }
  }
  useEffect(() => {
    if (table?.tableSession?.status === `REQUESTED_PAYMENT`){
      setIsModalPaymentOpen(true)
    }
    }, [])

  return (
    <Box w="100%" display="flex">
      <Chart
        headingTitle={`Mesa : ${table.number}`}
        hasCreateButton={false}
        openModal={() => setIsModalOpen(true)}
        onPress={handleRemoveTable}
      >
        {!table.tableSession ? (
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
          table.tableSession.orders.map((order, orderIndex) => {
            return (
              <Accordion key={orderIndex} title={`Pedido #${order.id}`}>
                {order.products.map((product, productIndex) => {
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
                })}
              </Accordion>
            )
          })
        )}
      </Chart>
      <Modal
        isOpen={isModalOpen}
        title={`QrCode Mesa : ${table.number}`}
        onClose={() => setIsModalOpen(false)}
        buttonTitle="Download"
        onClick={undefined}
      >
        <QRCode
          value={JSON.stringify({ tableId: table.id })}
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
    </Box>
  )
}
