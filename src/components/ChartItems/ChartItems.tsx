import { Tbody, Td, Tr, Button, Icon } from '@chakra-ui/react'
import { RiPencilLine } from 'react-icons/ri'
import { FaClock, FaRegTrashAlt } from 'react-icons/fa'
import { format } from 'date-fns'
import { useEffect } from 'react'

type ChartItemsFormat = {
  label: string
  format: 'text' | 'currency' | 'date'
}

export type ChartItemsProperty<T> = {
  // eslint-disable-next-line no-unused-vars
  [_key in keyof T]?: ChartItemsFormat
}

type ChartItemsProps<T> = {
  values: ChartItemsProperty<T>
  expires: boolean
  data: T
  onEdit: () => void
  onRemove?: () => void
  onExpires?: () => void
}

export function ChartItems<T>(props: ChartItemsProps<T>) {
  useEffect(() => {
    
  },[])
  const propValues = Object.entries(props.values) as [
    keyof T,
    ChartItemsFormat,
  ][]
  
  const chartValues = propValues.map(([key, value], index) => {
    console.log(value);
    return (
      <Td textColor="gray.300" fontWeight="bold" key={index}>
        {value.format === 'currency'
          ? `${new Intl.NumberFormat('pt-br', {
              style: 'currency',
              currency: 'BRL',
            }).format(Number(props.data[key]) / 100)}`
          : `${
              value.format === 'date'
                ? format(new Date(String(props.data[key])), 'dd/MM/yyyy')
                : props.data[key]
            }`}
      </Td>
    )
  })
  return (
    <Tbody>
      <Tr>
        <Td px="6"></Td>
        {chartValues}
        <Td>
          <Button
            as="a"
            size="sm"
            fontSize="sm"
            colorScheme="green"
            leftIcon={<Icon as={RiPencilLine} fontSize="18" />}
            onClick={props.onEdit}
          >
            Editar
          </Button>
          { props.expires? <Button
            as="a"
            size="sm"
            fontSize="sm"
            colorScheme="orange"
            leftIcon={<Icon as={FaClock} color="white" fontSize="18" />}
            marginLeft={2}
            onClick={props.onExpires}
          >
            Expiração
          </Button>
          : <Button
          as="a"
          size="sm"
          fontSize="sm"
          colorScheme="red"
          leftIcon={<Icon as={FaRegTrashAlt} color="white" fontSize="18" />}
          marginLeft={2}
          onClick={props.onRemove}
        >
          Excluir
        </Button>}
        </Td>
      </Tr>
    </Tbody>
  )
}
