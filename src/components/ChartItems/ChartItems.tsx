import { Tbody, Td, Tr, Button, Icon, Text } from '@chakra-ui/react'
import { RiPencilLine, RiEyeFill } from 'react-icons/ri'
import { FaClock, FaRegTrashAlt } from 'react-icons/fa'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { Modal } from '../Modal'

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
  expires?: boolean
  password?: boolean
  data: T
  onEdit?: () => void
  onPassword?: () => void
  onRemove?: () => void
  onExpires?: () => void
}

export function ChartItems<T>(props: ChartItemsProps<T>) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  useEffect(() => {}, [])
  const propValues = Object.entries(props.values) as [
    keyof T,
    ChartItemsFormat,
  ][]

  const chartValues = propValues.map(([key, value], index) => {
    const date = new Date(String(props.data[key]))
    date.setDate(date.getDate() + 1)
    return (
      <Td textColor="gray.300" fontWeight="bold" key={index}>
        {value.format === 'currency'
          ? `${new Intl.NumberFormat('pt-br', {
              style: 'currency',
              currency: 'BRL',
            }).format(Number(props.data[key]) / 100)}`
          : `${
              value.format === 'date'
                ? format(date, 'dd/MM/yyyy')
                : props.data[key]
            }`}
      </Td>
    )
  })
  return (
    <>
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
            {props.password && (
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="blue"
                leftIcon={<Icon as={RiEyeFill} color="white" fontSize="18" />}
                marginLeft={2}
                onClick={props.onPassword}
              >
                Senha
              </Button>
            )}
            {props.expires ? (
              <Button
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
            ) : (
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="red"
                leftIcon={
                  <Icon as={FaRegTrashAlt} color="white" fontSize="18" />
                }
                marginLeft={2}
                onClick={() => setIsModalOpen(true)}
              >
                Excluir
              </Button>
            )}
          </Td>
        </Tr>
      </Tbody>
      <Modal
        isOpen={isModalOpen}
        title="Dejeja excluir?"
        onClose={() => setIsModalOpen(false)}
        onClick={props.onRemove}
        buttonTitle="Excluir"
        color="red"
      >
        <Text color="black" fontWeight="bold">
          Essa ação é irreversivel
        </Text>
      </Modal>
    </>
  )
}
