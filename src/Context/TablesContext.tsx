import { createContext, ReactNode, useEffect, useState } from 'react'
import { Table } from '../@types/Restaurant/tables'
import { api } from '../service/apiClient'
import { useAppToast } from '../hooks/useAppToast'
import useSocket from '../hooks/useSocket'
import { TableSession } from '../@types/Restaurant/tableSession'

type ResponseProps = {
  tables: Table[]
}

type TablesContextDataProps = {
  tables: Table[]
  fetchAllTables: () => Promise<void>
  fetchingTables: boolean
}

type TablesContextProviderProps = {
  children: ReactNode
}

export const TablesContext = createContext<TablesContextDataProps>({
  tables: [],
} as unknown as TablesContextDataProps)

export function TablesProvider({ children }: TablesContextProviderProps) {
  const { handleRequestError } = useAppToast()
  const [tables, setTables] = useState<Table[]>([])
  const [fetchingTables, setFetchingTables] = useState<boolean>(false)
  const socket = useSocket()

  useEffect(() => {
    if (socket) {
      socket.on('new-table-session', (args) => {
        updateTableSessionByTableId(args.content)
      })
      socket.on('new-order', (args) => {
        updateTableSessionByTableId(args.content)
      })
      socket.on('new-participant', (args) => {
        updateTableSessionByTableId(args.content)
      })
      socket.on('table-session-payment-requested', (args) => {
        console.log('PAGAMENTO SOLICITADO!')
        updateTableSessionByTableId(args.content)
      })
      socket.on('table-session-finished', (args) => {
        updateTableSessionByTableId(args.content)
      })
      socket.on('table-session-waiter-called', (args) => {
        updateTableSessionByTableId(args.content)
      })
      socket.on('table-session-order-product-canceled', (args) => {
        updateTableSessionByTableId(args.content)
      })
      socket.on('table-session-order-product-served', (args) => {
        updateTableSessionByTableId(args.content)
      })
    }

    return () => {
      if (socket) {
        socket.off('new-table-session')
        socket.off('new-order')
        socket.off('new-participant')
        socket.off('table-session-payment-requested')
        socket.off('table-session-finished')
        socket.off('table-session-waiter-called')
        socket.off('table-session-order-product-canceled')
        socket.off('table-session-order-product-served')
      }
    }
  }, [socket])

  const updateTableSessionByTableId = (tableSession: TableSession) => {
    setTables((prevTables) => {
      const tableIndex = prevTables.findIndex(
        (table) => table.id === tableSession.tableId,
      )

      if (tableIndex < 0) {
        return prevTables
      }

      const updatedTables = [...prevTables]

      updatedTables[tableIndex].tableSession = tableSession

      return updatedTables
    })
  }

  async function fetchAllTables() {
    setFetchingTables(true)

    try {
      const response = await api.get<ResponseProps>('/tables')
      setTables(response.data.tables)
    } catch (error) {
      handleRequestError(error)
    } finally {
      setFetchingTables(false)
    }
  }

  return (
    <TablesContext.Provider value={{ tables, fetchAllTables, fetchingTables }}>
      {children}
    </TablesContext.Provider>
  )
}
