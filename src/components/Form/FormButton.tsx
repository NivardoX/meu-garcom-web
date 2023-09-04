import { Button, Flex, HStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

type FormButtonProps = {
  isDisable: boolean
  buttonSubmitTitle?: string
}

export function FormButton({ isDisable, buttonSubmitTitle }: FormButtonProps) {
  const navigate = useNavigate()
  return (
    <Flex mt="8" justify="flex-end">
      <HStack spacing="4">
        <Button
          onClick={() => navigate(-1)}
          colorScheme="orange"
          color={'#fff'}
        >
          Cancelar
        </Button>
        <Button colorScheme="green" type="submit" isDisabled={isDisable}>
          {buttonSubmitTitle || 'Criar'}
        </Button>
      </HStack>
    </Flex>
  )
}
