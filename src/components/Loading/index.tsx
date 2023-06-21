import { VStack, Spinner } from '@chakra-ui/react'

export function Loading() {
  return (
    <VStack w="100%" height="500px" alignItems="center" justifyContent="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </VStack>
  )
}
