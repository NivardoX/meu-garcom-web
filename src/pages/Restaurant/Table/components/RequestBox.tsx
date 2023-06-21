import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

type RequestBoxProps = {
  children: ReactNode
}

export function RequestBox({ children }: RequestBoxProps) {
  return (
    <Box
      display="flex"
      width="100%"
      height="100px"
      borderRadius={10}
      borderColor="white"
      bg="gray.900"
      alignItems="center"
      justifyContent="space-between"
      marginTop={5}
    >
      {children}
    </Box>
  )
}
