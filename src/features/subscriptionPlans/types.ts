export type Subscription = {
  monthsAmount: number
  fullPrice: number
  pricePerMonth: number
}

export type PlanDescriptor = {
  promotion?: number
} & Subscription

export type CurrentSubscription = Subscription & {
  expiresIn: number
}
