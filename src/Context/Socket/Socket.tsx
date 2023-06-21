// import { createContext, ReactNode } from 'react'
// import useSocket from '../../hooks/useSocket'
// import { Socket } from 'socket.io-client'

// export type TSocketContextActions =
//   | 'new-table-session'
//   | 'new-order'
//   | 'new-participant'
//   | 'table-session-payment-requested'
//   | 'table-session-finished'
//   | 'table-session-waiter-called'
//   | 'table-session-order-product-canceled'
//   | 'table-session-order-product-served'

// export interface ISocketContextPayload {
//   socket: Socket
// }

// export interface ISocketContextMessage {
//   type: TSocketContextActions
//   payload: ISocketContextPayload
// }

// type SocketContextDataProps = {
//   socket: Socket | undefined
//   handleMessage: (message: ISocketContextMessage) => void
// }

// type SocketContextProviderProps = {
//   children: ReactNode
// }

// export const SocketContext = createContext<SocketContextDataProps>({
//   socket: undefined,
//   handleMessage: () => {},
// })

// export function SocketProvider({ children }: SocketContextProviderProps) {
//   const socket = useSocket()

//   const handleMessage = (message: ISocketContextMessage) => {
//     switch (message.type) {
//       case 'new-table-session':
//         console.log('new-table-session')
//         break
//       case 'new-order':
//         console.log('new-order')
//         break
//       case 'new-participant':
//         console.log('new-participant')
//         break
//       case 'table-session-payment-requested':
//         console.log('table-session-payment-requested')
//         break
//       case 'table-session-finished':
//         console.log('table-session-finished')
//         break
//       case 'table-session-waiter-called':
//         console.log('table-session-waiter-called')
//         break
//       case 'table-session-order-product-canceled':
//         console.log('table-session-order-product-canceled')
//         break
//       case 'table-session-order-product-served':
//         console.log('table-session-order-product-served')
//         break
//       default:
//     }
//   }

//   return (
//     <SocketContext.Provider value={{ socket, handleMessage }}>
//       {children}
//     </SocketContext.Provider>
//   )
// }
