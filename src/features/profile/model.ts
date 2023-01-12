import { createEvent, restore } from 'effector'
import { MOCK_PROFILE_WELBEX } from '../../_mock/profile'
import { UserProfile } from './types'

export const setUserProfile = createEvent<UserProfile>()
export const $userProfile = restore(setUserProfile, MOCK_PROFILE_WELBEX)

export const $userEmail = $userProfile.map((profile) => profile?.email ?? null)
