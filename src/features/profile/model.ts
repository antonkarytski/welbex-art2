import { createEvent, restore } from 'effector'
import { MyProfile } from '../../api/parts/users/types'
import { logOut } from '../auth/logOut/model'

export const setMyProfile = createEvent<MyProfile>()
export const updateProfile = createEvent<
  Partial<MyProfile> | ((props: MyProfile) => Partial<MyProfile>)
>()
export const $myProfile = restore(setMyProfile, null)
  .on(updateProfile, (state, payload) => {
    if (!state) return null
    if (typeof payload === 'function') return { ...state, ...payload(state) }
    return { ...state, ...payload }
  })
  .reset(logOut)

export const $userEmail = $myProfile.map((profile) => profile?.email ?? null)
export const $currentSubscription = $myProfile.map(
  (profile) => profile?.subscription ?? null
)
