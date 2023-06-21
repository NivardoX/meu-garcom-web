/* eslint-disable no-unused-vars */
import { OrderProducts } from './orderProducts'

export enum RequestStatus {
  REQUESTED = 'REQUESTED',
  SERVED = 'SERVED',
  CANCELED = 'CANCELED',
}

export type Order = {
  id: string
  tableParticipantId: string
  requestedAt: Date
  status: RequestStatus
  products: OrderProducts[]
}
