import { Button, Icon, VStack } from '@chakra-ui/react'
import { MdClear, MdDone } from 'react-icons/md'
import { Order, RequestStatus } from '../../../../@types/Restaurant/order'
import { OrderProducts } from '../../../../@types/Restaurant/orderProducts'
import { api } from '../../../../service/apiClient'
import { useAppToast } from '../../../../hooks/useAppToast'

type ButtonStatusOrderProps = {
  requestStatus: RequestStatus
  orderId: Order['id']
  productId: OrderProducts['id']
}

export function ButtonStatusOrder({
  requestStatus,
  orderId,
  productId,
}: ButtonStatusOrderProps) {
  const { handleRequestError, handleRequestSuccess } = useAppToast()

  async function handleChangeRequestStatusToCanceled() {
    try {
      const response = await api.patch(
        `/order/${orderId}/product/${productId}/cancel`,
      )
      if (response.status === 200) {
        handleRequestSuccess('Produto Removido!')
      }
    } catch (error) {
      handleRequestError(error)
    }
  }

  async function handleChangeRequestStatusToServed() {
    try {
      const response = await api.patch(
        `/order/${orderId}/product/${productId}/serve`,
      )
      if (response.status === 201) {
        handleRequestSuccess('Pedido Entregue!')
      }
    } catch (error) {
      handleRequestError(error)
    }
  }

  return (
    <>
      {RequestStatus.REQUESTED === requestStatus ? (
        <VStack marginRight={5}>
          <Button
            size="sm"
            bg="green"
            onClick={handleChangeRequestStatusToServed}
          >
            <Icon as={MdDone} boxSize={4} color="white" />
          </Button>

          <Button
            bg="red"
            size="sm"
            onClick={handleChangeRequestStatusToCanceled}
          >
            <Icon as={MdClear} boxSize={4} color="white" />
          </Button>
        </VStack>
      ) : undefined}
    </>
  )
}
