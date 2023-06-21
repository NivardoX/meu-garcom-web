import { Button, Flex, HStack } from '@chakra-ui/react'

type FormButtonProps = {
  isDisable: boolean
  buttonSubmitTitle?: string
}

export function FormButton({ isDisable, buttonSubmitTitle }: FormButtonProps) {
  return (
    <Flex mt="8" justify="flex-end">
      <HStack spacing="4">
        <Button colorScheme="whiteAlpha">Cancelar</Button>
        <Button colorScheme="green" type="submit" isDisabled={isDisable}>
          {buttonSubmitTitle || 'Criar'}
        </Button>
      </HStack>
    </Flex>
  )
}
