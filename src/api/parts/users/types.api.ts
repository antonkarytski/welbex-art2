import { ImageSourcePropType } from 'react-native'
import { TokenType } from '../../../lib/models/apiBuilder/types.token'
import { User } from './types'
import {
  UserCounters,
  UserInitialData,
  UserPrivateData,
  UserSecuredData,
  UserSubscription,
} from './types.parts'

export enum IdentityDocumentStatus {
  UNDETERMINED = 1,
  PENDING,
  DETERMINED,
  REJECTED,
}

export type ProfileResponse = User & UserCounters
export type MyProfileResponse = ProfileResponse &
  UserPrivateData & {
    subscription: UserSubscription | null
    identity_determined_status_id: IdentityDocumentStatus
  }

export type UserProfileResponse = ProfileResponse & {
  is_followed: boolean
  is_child: boolean
}
export type SignUpBody = {
  password: string
} & UserInitialData &
  UserSecuredData

export type SingUpResponseUser = UserInitialData & UserPrivateData

export type SignUpResponse = {
  user: SingUpResponseUser
  tokens: {
    access_token: string
    refresh_token: string
    token_type: TokenType
  }
}

export type EditProfileBody = Omit<UserInitialData, 'is_child'> &
  Omit<UserSecuredData, 'email'>

export type EditProfileResponse = EditProfileBody & {
  avatar: ImageSourcePropType | string
}
