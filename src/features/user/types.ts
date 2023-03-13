import { Profile } from '../../api/parts/users/types'
import { UserProfileResponse } from '../../api/parts/users/types.api'

export enum UserDrawingListType {
  OWN = 'own',
  LIKED = 'liked',
  SAVED = 'saved',
}

export type UserItem = Profile | (UserProfileResponse & { id: number })
