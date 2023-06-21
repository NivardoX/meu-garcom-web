import { TableSession } from './tableSession'

export type Table = {
  id: string
  number: number
  restaurantId: string
  waiterId: string
  tableSession: TableSession | null
}
