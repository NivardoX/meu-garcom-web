import {
  Button,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Modal as ChakraModal,
  ModalFooter,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

type ModalProps = {
  isOpen: boolean
  title: string
  description?: string
  children?: ReactNode
  buttonTitle?: string
  color?: string
  onClick?: () => void
  onOpen?: () => void
  onClose: () => void
}

export function Modal(props: ModalProps) {
  return (
    <>
      <ChakraModal
        closeOnOverlayClick={false}
        isOpen={props.isOpen}
        onClose={props.onClose}
      >
        <ModalOverlay />
        <ModalContent bg="whiteAlpha.900" w={'auto'}>
          <ModalHeader color="black">{props.title || undefined}</ModalHeader>
          <ModalBody pb={6} display="flex" justifyContent="center">
            {props.children || <Text color="black">{props.description}</Text>}
          </ModalBody>

          <ModalFooter>
            {props.buttonTitle !== 'Fechar'
              ? props.buttonTitle !== 'Escolher Depois' && (
                  <Button
                    colorScheme={props.color ? props.color : 'green'}
                    mr={3}
                    onClick={props.onClick}
                  >
                    {props.buttonTitle || 'Criar'}
                  </Button>
                )
              : null}
            {props.buttonTitle !== 'Fechar' ? (
              props.buttonTitle === 'Escolher Depois' ? (
                <Button
                  colorScheme="orange"
                  color={'#fff'}
                  onClick={props.onClose}
                >
                  {props.buttonTitle}
                </Button>
              ) : (
                <Button
                  colorScheme="orange"
                  color={'#fff'}
                  onClick={props.onClose}
                >
                  Cancelar
                </Button>
              )
            ) : (
              <Button
                colorScheme="orange"
                color={'#fff'}
                onClick={props.onClose}
              >
                Fechar
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  )
}
