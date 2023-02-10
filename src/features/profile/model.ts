import { createEvent, restore } from 'effector'
import { MOCK_PROFILE_WELBEX } from '../../_mock/profile'
import { UserProfile } from './types'

export const setUserProfile = createEvent<UserProfile>()
export const resetUserProfile = createEvent()
export const $userProfile = restore(setUserProfile, MOCK_PROFILE_WELBEX).reset(
  resetUserProfile
)

export const $userEmail = $userProfile.map((profile) => profile?.email ?? null)
export const $currentSubscription = $userProfile.map(
  ({ subscription }) => subscription
)
