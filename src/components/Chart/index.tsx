import { Box, Flex, HStack, Heading } from '@chakra-ui/react'
import { CreateButton } from '../CreateButton/CreateButton'
import { ReactNode } from 'react'
import { QrCodeButton } from '../../pages/Restaurant/Table/components/QrCodeButton'

interface ChartProps {
  headingTitle: string
  children: ReactNode
  href?: string
  hasCreateButton?: boolean
  openModal?: () => void
  onPress?: () => void
}

export function Chart({ hasCreateButton = true, ...props }: ChartProps) {
  return (
    <Flex w="100%" my="9" maxWidth={1480} mx="auto" px="8">
      <Box flex="1" borderRadius={8} bg="gray.800" p={8}>
        <Flex mb="8" justifyContent="space-between" align="center">
          <Heading size="lg" fontWeight="normal" color="white">
            {props.headingTitle}
          </Heading>
          {hasCreateButton ? (
            <CreateButton
              title={'Criar Novo'}
              href={props.href}
              onPress={props.onPress}
            />
          ) : (
            <HStack w="auto">
              <QrCodeButton onClick={props.openModal} />
              <CreateButton
                title={'Fechar Mesa'}
                color="red"
                href={props.href}
                onPress={props.onPress}
              />
            </HStack>
          )}
        </Flex>
        {props.children}
      </Box>
    </Flex>
  )
}
