import {
  Button,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormLabel,
  InputGroup,
  InputRightElement,
  Tooltip,
} from '@chakra-ui/react'
import { useState } from 'react'

import { UseFormRegister } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

interface InputPasswordProps extends ChakraInputProps {
  register: UseFormRegister<any>
  type?: 'file' | 'text' | 'password'
  name: string
  label?: string
  required?: boolean
  placeHolder?: string
}

export function InputPassword({
  required = true,
  ...props
}: InputPasswordProps) {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <>
      {!!props.label && (
        <FormLabel display={'flex'} htmlFor={props.name}>
          {props.label}
          {required && (
            <Tooltip
              height={35}
              w={120}
              display={'flex'}
              alignItems="center"
              justifyContent="center"
              borderRadius={'.5rem'}
              hasArrow
              label="Obrigatório"
              placement="top-start"
            >
              <p
                style={{
                  color: 'red',
                  marginLeft: '.25rem',
                }}
              >
                *
              </p>
            </Tooltip>
          )}
        </FormLabel>
      )}
      <InputGroup
        size="md"
        display="flex"
        alignItems={'center'}
        justifyContent={'center'}
      >
        <ChakraInput
          autoComplete="off"
          focusBorderColor="pink.500"
          bgColor="gray.900"
          variant="filled"
          placeholder={props.placeHolder || ''}
          required={required}
          type={show ? 'text' : 'password'}
          _hover={{ bgColor: 'gray.900' }}
          marginBottom={4}
          size="lg"
          {...props.register(props.name)}
        />
        <InputRightElement width="4.5rem">
          <Button
            bg="gray.100"
            h="2rem"
            w={'2rem'}
            size="xs"
            mt={2}
            onClick={handleClick}
          >
            {show ? (
              <FaEye color="black" cursor="pointer" />
            ) : (
              <FaEyeSlash color="black" cursor="pointer" />
            )}
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  )
}
