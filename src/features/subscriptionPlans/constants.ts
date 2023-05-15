import { PlanDescriptor } from './types'

export const SUBSCRIPTION_PLANS: PlanDescriptor[] = [
  { monthsAmount: 6, pricePerMonth: 1.67, fullPrice: 10 },
  { monthsAmount: 12, pricePerMonth: 1.25, promotion: 25, fullPrice: 15 },
  { monthsAmount: 24, pricePerMonth: 1.04, promotion: 37.5, fullPrice: 25 },
]
