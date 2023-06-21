import { Table, Th, Thead, Tr } from '@chakra-ui/react'
import { ReactNode } from 'react'

type ChartContentFormat = {
  label: string
}

export type ChartContentProperty = {
  [key: string]: ChartContentFormat
}

type ChartContentProps = {
  headers: ChartContentProperty
  children: ReactNode
}

export function ChartContent(props: ChartContentProps) {
  const TableHeaders = Object.values(props.headers).map((element, index) => {
    return <Th key={index}>{element.label}</Th>
  })
  return (
    <Table colorScheme="whiteAlpha">
      <Thead>
        <Tr>
          <Th px="6" color="gray.300" width="8"></Th>
          {TableHeaders}
          <Th />
        </Tr>
      </Thead>
      {props.children}
    </Table>
  )
}
