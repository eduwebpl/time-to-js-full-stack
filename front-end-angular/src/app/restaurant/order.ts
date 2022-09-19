import { Delivery } from './delivery'

export interface Order {
  id: number
  date: string,
  delivery?: Delivery
}
