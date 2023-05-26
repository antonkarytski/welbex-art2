import { useStoreMap } from 'effector-react'
import { $myProfile } from '../../features/profile/model'
import { isActiveSubscription } from '../../features/subscription/helpers'

export const useIsAdsVisible = () => {
  return useStoreMap({
    store: $myProfile,
    keys: [],
    fn: (myProfile) => __DEV__ || !isActiveSubscription(myProfile),
  })
}
