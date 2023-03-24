export type Subscription = {
  duration: number
  price: number
  id: number
}

export type SubscriptionResponse = {
  is_active: boolean
  date_start: string
  date_end: string
  type: Subscription
}
