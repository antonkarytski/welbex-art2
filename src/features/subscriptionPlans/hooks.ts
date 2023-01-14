import { useStore } from 'effector-react'
import { $selectedSubscriptionPlanIndex, SUBSCRIPTION_PLANS } from './model'

export const useSelectedSubscriptionPlan = () => {
  const selectedItemIndex = useStore($selectedSubscriptionPlanIndex)
  return SUBSCRIPTION_PLANS[selectedItemIndex]
}
