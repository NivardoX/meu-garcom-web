import { Box, HStack, VStack, Text } from '@chakra-ui/react'
import { ProductImage } from './ProductImage'
import { RequestStatus } from '../../../../@types/Restaurant/order'
import exampleFood from '../../../../assets/placeholder.png'

type RequestContentProps = {
  requestProductName: string
  requestProductStatus: RequestStatus
  requestProductImage: string
  requestProductNumber: number
}

export function RequestContent({
  requestProductName,
  requestProductStatus,
  requestProductImage,
  requestProductNumber,
}: RequestContentProps) {
  const requestStatus: Record<
    RequestStatus,
    { message: string; color: string }
  > = {
    [RequestStatus.REQUESTED]: {
      message: 'Pedido Solicitado',
      color: 'orange',
    },
    [RequestStatus.CANCELED]: { message: 'Pedido Cancelado', color: 'red' },
    [RequestStatus.SERVED]: { message: 'Pedido Concluido', color: 'green' },
  }

  const { message, color } = requestStatus[requestProductStatus]

  return (
    <>
      <Box
        width="12px"
        height="100%"
        borderColor="white"
        borderTopLeftRadius={18}
        borderBottomRightRadius={18}
        bg={color}
      />
      <HStack marginLeft={3} marginRight="auto">
        <ProductImage url={requestProductImage || exampleFood} />
        <VStack>
          <Text
            marginTop={1}
            marginRight="auto"
            fontSize={16}
            fontWeight="bold"
          >
            {requestProductName}
            {' x' + requestProductNumber}
          </Text>
          <Text marginTop="auto" fontSize={14}>
            {message}
          </Text>
        </VStack>
      </HStack>
    </>
  )
}
