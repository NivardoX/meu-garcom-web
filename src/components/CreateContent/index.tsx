import {
  Box,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

type CreateContentProps = {
  headingTitle: string
  size?: 'small' | 'medium' | 'large'
  children?: ReactNode
}

export function CreateContent({ ...props }: CreateContentProps) {
  const maxWidth: Record<NonNullable<CreateContentProps['size']>, number> = {
    small: 600,
    medium: 1080,
    large: 1480,
  }

  return (
    <Flex
      my="6"
      maxWidth={props.size ? maxWidth[props.size] : maxWidth.large}
      mx="auto"
      px="6"
    >
      <Box flex="1" borderRadius={8} bg="gray.800" p="8">
        <Heading size="lg" fontWeight="normal">
          {props.headingTitle}
        </Heading>
        <Divider my="6" borderColor="gray.700" />
        <VStack spacing="8">
          <SimpleGrid minChildWidth="200px" w="100%" spacing="8">
            {props.children}
          </SimpleGrid>
        </VStack>
      </Box>
    </Flex>
  )
}
