import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Tooltip,
} from '@chakra-ui/react'

import { FieldError, UseFormRegister } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
  register: UseFormRegister<any>
  type?: 'file' | 'text' | 'password' | 'number' | 'date'
  name: string
  label?: string
  error?: FieldError
  placeHolder?: string
  required?: boolean
  variant?: 'filled' | 'outline' | 'unstyled'
}

export function Input({
  name,
  label,
  placeHolder,
  variant,
  type,
  error,
  register,
  required = true,
  ...rest
}: InputProps) {
  return (
    <FormControl>
      {!!label && (
        <FormLabel display={'flex'} htmlFor={name}>
          {label}
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
      <ChakraInput
        id={name}
        autoComplete="off"
        focusBorderColor="gray.400"
        bgColor="gray.900"
        textColor="white"
        placeholder={placeHolder}
        required={required}
        variant={variant || 'filled'}
        type={type}
        _hover={{ bgColor: 'gray.900' }}
        marginBottom={4}
        size="lg"
        {...register(name)}
        {...rest}
      />
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}
