export interface Delivery {
  id: number
  deliveryDate: string
  status:  'IN_PROGRESS' | 'DELIVERED' | 'CANCELED'
  address: string
}
