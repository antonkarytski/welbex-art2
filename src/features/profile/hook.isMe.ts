import { useStoreMap } from 'effector-react'
import { $myProfile } from './model'

export const useIsMe = (id: string | number) => {
  return useStoreMap({
    store: $myProfile,
    keys: [id],
    fn: (myProfile) => myProfile && myProfile.id === id,
  })
}
