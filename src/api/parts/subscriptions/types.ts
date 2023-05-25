export enum SubscriptionCurrency {
  RUB = 'RUB',
  USD = 'USD',
}

export type Subscription = {
  duration: number
  price: number
  id: number
  currency: SubscriptionCurrency
}

export type SubscriptionResponse = {
  is_active: boolean
  date_start: string
  date_end: string
  type: Subscription
}

export type ToPaymentResponse = {
  redirect_url: string
}

export type SubscriptionsFilter = {
  currency: SubscriptionCurrency
}
