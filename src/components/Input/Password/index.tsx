import {
  Button,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormLabel,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { useState } from 'react'

import { UseFormRegister } from 'react-hook-form'

interface InputPasswordProps extends ChakraInputProps {
  register: UseFormRegister<any>
  type?: 'file' | 'text' | 'password'
  name: string
  label?: string
  placeHolder?: string
}

export function InputPassword(props: InputPasswordProps) {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <>
      {!!props.label && (
        <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
      )}
      <InputGroup size="md" display="flex">
        <ChakraInput
          focusBorderColor="pink.500"
          bgColor="gray.900"
          variant="filled"
          placeholder={props.placeHolder || ''}
          type={show ? 'text' : 'password'}
          _hover={{ bgColor: 'gray.900' }}
          marginBottom={4}
          size="lg"
          {...props.register(props.name)}
        />
        <InputRightElement width="4.5rem">
          <Button
            bg="gray.600"
            h="2rem"
            size="xs"
            onClick={handleClick}
            marginTop="auto"
            marginLeft="auto"
            marginRight="2"
            marginBottom={4}
          >
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  )
}
