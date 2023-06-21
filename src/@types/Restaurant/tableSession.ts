import { Bill } from './bill'
import { BillPerParticipant } from './billPerParticipant'
import { Order } from './order'
import { Participant } from './participants'

export enum RequestTableSessionStatus {
  REQUESTEDPAYMENT = 'REQUESTED_PAYMENT',
  OPENED = 'OPENED',
}

export type TableSession = {
  id: string
  status: RequestTableSessionStatus
  restaurantId: string
  tableId: string
  tableNumber: number
  password: string
  waiter: {
    name: string
  }
  participants: Participant[]
  orders: Order[]
  bill: Bill[]
  billPerParticipant: BillPerParticipant[]
  totalPriceCents: number
  finishedAt: Date
}
