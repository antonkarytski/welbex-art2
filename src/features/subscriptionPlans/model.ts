import { createEvent, restore } from 'effector'

export const setSubscriptionPlanIndex = createEvent<number>()
export const $selectedSubscriptionPlanIndex = restore(
  setSubscriptionPlanIndex,
  1
)
