import { Subscription } from '../../../api/parts/subscriptions/types'

export type PlanDescriptor = {
  promotion: number
  fullPrice: string
} & Subscription
