import { RequestStatus } from './order'

export type OrderProducts = {
  id: string
  status: RequestStatus
  name: string
  description: string
  priceInCents: number
  amount: number
  imageUrl: string
  servedAt: Date
  canceledAt: Date
}
