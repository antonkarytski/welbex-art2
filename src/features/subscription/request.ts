import { attach } from 'effector'
import { api } from '../../api'
import { SubscriptionStatus } from '../../api/parts/subscriptions/types'
import { updateProfile } from '../profile/model'

type UpdateSubscriptionsProps = {
  attempt?: number
}
export const updateSubscriptionStatus = attach({
  mapParams: (props?: UpdateSubscriptionsProps) => {},
  effect: api.subscriptions.my,
})

const MAX_ATTEMPTS_COUNT = 3

updateSubscriptionStatus.done.watch(({ result, params }) => {
  if (!result || result.status_id === SubscriptionStatus.ACTIVE) {
    updateProfile((profile) => ({ ...profile, subscription: result }))
    return
  }
  if (params?.attempt && params.attempt > MAX_ATTEMPTS_COUNT) {
    return
  }
  const currentAttempt = params?.attempt || 1
  setTimeout(() => {
    updateSubscriptionStatus({ attempt: currentAttempt + 1 }).catch(() => {})
  }, 2000 * currentAttempt)
})
