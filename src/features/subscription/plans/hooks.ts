import { useStore } from 'effector-react'
import { selectedSubscriptionPlan } from './model'

export const useSelectedSubscriptionPlan = () => {
  return useStore(selectedSubscriptionPlan.$state)
}
