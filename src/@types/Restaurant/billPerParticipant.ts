import { Bill } from './bill'

export type BillPerParticipant = {
  id: string
  customerId: string
  username: string
  name: string
  isLeader: true
  bill: Bill[]
  totalPriceCents: number
}
