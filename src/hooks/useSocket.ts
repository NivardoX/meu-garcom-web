import { useEffect, useRef, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import { TableSession } from '../@types/Restaurant/tableSession'

const DEFAULT_URL =
  'http://meu-garcom-load-balancer-684548247.us-east-1.elb.amazonaws.com'

type Events =
  | 'new-table-session'
  | 'new-order'
  | 'new-participant'
  | 'table-session-payment-requested'
  | 'table-session-finished'
  | 'table-session-waiter-called'
  | 'table-session-order-product-canceled'
  | 'table-session-order-product-served'

type MappedEvents = Record<Events, (args: { content: TableSession }) => void>

const useSocket = (url: string = DEFAULT_URL): Socket<MappedEvents> => {
  const socketRef = useRef<Socket<MappedEvents>>()
  const [socketUrl, setSocketUrl] = useState(url) 

  useEffect(() => {
    socketRef.current = io(url)
    console.log('refresh');
    
    return () => {
      socketRef.current?.disconnect()
    }
  }, [socketUrl])
  const refresh = () => {
    socketRef.current = io(url)
    console.log('refresh');
    
    return () => {
      socketRef.current?.disconnect()
    }
  }
setInterval(() => {
  setSocketUrl(url)
  refresh()
}, 1000000)
  return socketRef.current as Socket<MappedEvents>
}

export default useSocket
