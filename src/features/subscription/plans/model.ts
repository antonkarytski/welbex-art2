import { attach, createEffect } from 'effector'
import { createStateModel } from 'altek-toolkit'
import { api } from '../../../api'
import { SubscriptionCurrency } from '../../../api/parts/subscriptions/types'
import { convertToPlanDescriptor } from './helpers'
import { PlanDescriptor } from './types'

export const currentCurrency = createStateModel(SubscriptionCurrency.RUB)
export const selectedSubscriptionPlan = createStateModel<PlanDescriptor | null>(
  null
)
export const subscriptionPlans = createStateModel<PlanDescriptor[] | null>(null)

type GetAvailableFxProps = {
  plans: PlanDescriptor[] | null
  currency: SubscriptionCurrency
}
export const loadPlans = attach({
  source: { plans: subscriptionPlans.$state, currency: currentCurrency.$state },
  mapParams: (_: void, store) => store,
  effect: createEffect(({ plans, currency }: GetAvailableFxProps) => {
    if (plans) return
    return api.subscriptions.getAvailable({ currency })
  }),
})

loadPlans.done.watch(({ result }) => {
  if (!result) return
  const plans = convertToPlanDescriptor(result)
  subscriptionPlans.set(plans)
  selectedSubscriptionPlan.set(plans[0])
})
