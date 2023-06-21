import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react'

import { FieldError, UseFormRegister } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
  register: UseFormRegister<any>
  type?: 'file' | 'text' | 'password' | 'number' | 'date'
  name: string
  label?: string
  error?: FieldError
  placeHolder?: string
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
  ...rest
}: InputProps) {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        id={name}
        focusBorderColor="gray.400"
        bgColor="gray.900"
        textColor="white"
        placeholder={placeHolder}
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
