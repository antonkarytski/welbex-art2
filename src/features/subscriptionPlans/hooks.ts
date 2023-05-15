import { useStore } from 'effector-react'
import { SUBSCRIPTION_PLANS } from './constants'
import { $selectedSubscriptionPlanIndex } from './model'

export const useSelectedSubscriptionPlan = () => {
  const selectedItemIndex = useStore($selectedSubscriptionPlanIndex)
  return SUBSCRIPTION_PLANS[selectedItemIndex]
}
