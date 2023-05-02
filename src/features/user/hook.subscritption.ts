import { useStoreMap } from 'effector-react'
import { $myProfile } from '../profile/model'

export function useSubscriptionCheck() {
  return useStoreMap({
    store: $myProfile,
    keys: [],
    fn: (profile) => !!profile?.subscription,
  })
}
