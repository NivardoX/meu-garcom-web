import { VStack, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { CreateButton } from '../CreateButton/CreateButton'

type EmptyStateProps = {
  icon: ReactNode
  title: string
  description?: boolean
  garçom?: boolean
  heigth?: number
  atrelar?: () => void
}

export function EmptyState({
  icon,
  title,
  heigth = 400,
  description = true,
  garçom = false,
  atrelar,
}: EmptyStateProps) {
  return (
    <VStack height={heigth} alignItems="center" justifyContent="center">
      {icon}
      <Text color="gray.200">{title}</Text>
      {description ? (
        <Text color="gray.200">
          {' '}
          tente o botão Criar Novo para adicionar novos itens a sua listagem
        </Text>
      ) : undefined}
      {garçom && <CreateButton title="Atrelar" onPress={atrelar} />}
    </VStack>
  )
}
