import { Delivery } from './delivery'
import { Product } from './product'
import { Restaurant } from './restaurant'

export interface Order {
  id: number
  date: string,
  delivery?: Delivery
  restaurant: Restaurant
  products: Product[]
}
