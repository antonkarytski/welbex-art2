import { createEvent, restore } from 'effector'
import { UserProfile } from './types'

export const setUserProfile = createEvent<UserProfile>()
export const $userProfile = restore(setUserProfile, null)

export const $userEmail = $userProfile.map((profile) => profile?.email ?? null)
