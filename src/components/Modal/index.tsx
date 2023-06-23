import {
  Button,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Modal as ChakraModal,
  ModalFooter,
} from "@chakra-ui/react";
import { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  title: string;
  description?: string;
  children?: ReactNode;
  buttonTitle?: string;
  onClick?: () => void;
  onOpen?: () => void;
  onClose: () => void;
};

export function Modal(props: ModalProps) {
  return (
    <>
      <ChakraModal
        closeOnOverlayClick={false}
        isOpen={props.isOpen}
        onClose={props.onClose}
      >
        <ModalOverlay />
        <ModalContent bg="whiteAlpha.900">
          <ModalHeader color="black">{props.title || undefined}</ModalHeader>
          <ModalBody pb={6} display="flex" justifyContent="center">
            {props.children || <Text color="black">{props.description}</Text>}
          </ModalBody>

          <ModalFooter>
            {props.buttonTitle !== "Fechar" && (
              <Button colorScheme="green" mr={3} onClick={props.onClick}>
                {props.buttonTitle || "Criar"}
              </Button>
            )}
            {props.buttonTitle !== "Fechar" ? (
            <Button onClick={props.onClose}>Cancel</Button>
            )
          :
          (
            <Button colorScheme="orange" color={'#fff'} onClick={props.onClose}>Fechar</Button>

          )}
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  );
}

