import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { Table } from '../@types/Restaurant/tables'
import { api } from '../service/apiClient'
import { useAppToast } from '../hooks/useAppToast'
import useSocket from '../hooks/useSocket'
import { TableSession } from '../@types/Restaurant/tableSession'
import bell from '../assets/bellSound.mp3'
import payment from '../assets/paymentSound.wav'

type ResponseProps = {
  tables: Table[]
}

type TablesContextDataProps = {
  tables: Table[]
  fetchAllTables: () => Promise<void>
  fetchingTables: boolean
  waiterCalled: boolean
  newOrder: boolean
  setWaiterCalled: Dispatch<SetStateAction<boolean>>
  setNewOrder: Dispatch<SetStateAction<boolean>>
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
  const [waiterCalled, setWaiterCalled] = useState<boolean>(false)
  const [newOrder, setNewOrder] = useState<boolean>(false)
  const socket = useSocket()
  function play(sound: any) {
    return new Audio(sound).play()
  }

  useEffect(() => {
    if (socket) {
      socket.on('new-table-session', (args) => {
        console.log(args.content)

        updateTableSessionByTableId(args.content)
      })
      socket.on('new-order', (args) => {
        console.log(args.content)
        setNewOrder(true)
        updateTableSessionByTableId(args.content)
        play(bell)
      })
      socket.on('new-participant', (args) => {
        console.log(args.content)
        updateTableSessionByTableId(args.content)
      })
      socket.on('table-session-payment-requested', (args) => {
        setNewOrder(false)
        setWaiterCalled(false)
        updateTableSessionByTableId(args.content)
        play(payment)
      })
      socket.on('table-session-finished', (args) => {
        console.log(args.content)
        updateTableSessionByTableId(args.content)
      })
      socket.on('table-session-waiter-called', (args) => {
        console.log('Call => ' + JSON.stringify(args.content))
        setWaiterCalled(true)
        updateTableSessionByTableId(args.content)
        play(bell)
      })
      socket.on('table-session-order-product-canceled', (args) => {
        console.log(args.content)
        updateTableSessionByTableId(args.content)
      })
      socket.on('table-session-order-product-served', (args) => {
        console.log(args.content)
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
    <TablesContext.Provider
      value={{
        tables,
        fetchAllTables,
        fetchingTables,
        waiterCalled,
        setWaiterCalled,
        newOrder,
        setNewOrder,
      }}
    >
      {children}
    </TablesContext.Provider>
  )
}
