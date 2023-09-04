import { Box, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { Table as TableType } from '../../../../@types/Restaurant/tables'
import { RequestTableSessionStatus } from '../../../../@types/Restaurant/tableSession'
import { useTables } from '../../../../hooks/useTables'

type TableProps = {
  table: TableType
  onPress?: () => void
}

export function Table({ table, onPress }: TableProps) {
  const { waiterCalled, newOrder } = useTables()
  const requestTableSessionStatus: Record<RequestTableSessionStatus, string> = {
    [RequestTableSessionStatus.OPENED]: 'red',
    [RequestTableSessionStatus.REQUESTEDPAYMENT]: 'orange',
  }
  useEffect(() => {
    setBackgroundColor(
      table.tableSession
        ? waiterCalled
          ? 'blue'
          : newOrder
          ? 'darkred'
          : requestTableSessionStatus[table.tableSession.status]
        : 'green',
    )
  }, [table.tableSession?.status, waiterCalled, newOrder])

  const [backgroundColor, setBackgroundColor] = useState(
    table.tableSession
      ? requestTableSessionStatus[table.tableSession.status]
      : 'green',
  )

  return (
    <button onClick={onPress}>
      <Box
        display="flex"
        backgroundColor="white"
        borderRadius={15}
        width={24}
        height={24}
        flexDirection="column"
        alignItems="center"
      >
        <Box
          display="flex"
          backgroundColor={backgroundColor}
          width="100%"
          height={8}
          borderTopRadius={15}
          justifyContent="center"
          alignItems="center"
        >
          <Text color="white" fontWeight="bold" alignSelf="center">
            Mesa
          </Text>
        </Box>
        <Text color="black" fontWeight="bold" fontSize={34} marginTop={1}>
          {table.number >= 1 && table.number <= 9
            ? `0${table.number}`
            : table.number}
        </Text>
      </Box>
    </button>
  )
}
