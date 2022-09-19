import { Product } from './product'

export interface Restaurant {
  id: number
  name: string
  address: string
  type: string | null
  products?: Product[]
}
