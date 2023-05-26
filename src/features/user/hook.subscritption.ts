import { useStoreMap } from 'effector-react'
import { $myProfile } from '../profile/model'
import { isActiveSubscription } from '../subscription/helpers'

export function useSubscriptionCheck() {
  return useStoreMap({
    store: $myProfile,
    keys: [],
    fn: isActiveSubscription,
  })
}
