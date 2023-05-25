export enum SubscriptionCurrency {
  RUB = 'RUB',
  USD = 'USD',
}

export enum SubscriptionStatus {
  ACTIVE = 1,
  PENDING = 2,
}

export type Subscription = {
  duration: number
  price: number
  id: number
  currency: SubscriptionCurrency
  full_amount: number
}

export type SubscriptionResponse = {
  is_active: boolean
  date_start: string
  date_end: string
  type: Subscription
  status_id: SubscriptionStatus
}

export type ToPaymentResponse = {
  redirect_url: string
}

export type SubscriptionsFilter = {
  currency: SubscriptionCurrency
}
