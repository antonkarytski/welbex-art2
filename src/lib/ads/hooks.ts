import { useStoreMap } from 'effector-react'
import { $myProfile } from '../../features/profile/model'

export const useIsAdsVisible = () => {
  return useStoreMap({
    store: $myProfile,
    keys: [],
    fn: (myProfile) => __DEV__ || !myProfile?.subscription,
  })
}
