import { VStack, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

type EmptyStateProps = {
  icon: ReactNode
  title: string
  description?: boolean
}

export function EmptyState({
  icon,
  title,
  description = true,
}: EmptyStateProps) {
  return (
    <VStack height="500px" alignItems="center" justifyContent="center">
      {icon}
      <Text color="gray.200">{title}</Text>
      {description ? (
        <Text color="gray.200">
          {' '}
          tente o botão Criar Novo para adicionar novos itens a sua listagem
        </Text>
      ) : undefined}
    </VStack>
  )
}
