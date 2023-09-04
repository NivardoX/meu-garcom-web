import { Select as ChakraSelect, FormLabel, Tooltip } from '@chakra-ui/react'
import { CategoryResponse } from '../../Category'
import { UseFormRegister } from 'react-hook-form'

interface SelectProps {
  category: CategoryResponse[]
  name: string
  value?: string
  label?: string
  register: UseFormRegister<any>
  defaultValue?: string
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export function Select(props: SelectProps) {
  const options = props.category.map((category) => ({
    value: category.id,
    label: category.name,
  }))

  return (
    <>
      {!!props.label && (
        <FormLabel display={'flex'} htmlFor={props.name}>
          {props.label}
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
        </FormLabel>
      )}
      <ChakraSelect
        {...props.register(props.name)}
        value={props.value ?? props.defaultValue ?? ''}
        focusBorderColor="gray.500"
        bgColor="gray.900"
        textColor="white"
        variant="filled"
        size="lg"
        mb={4}
        onChange={props.onChange}
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          )
        })}
      </ChakraSelect>
    </>
  )
}
