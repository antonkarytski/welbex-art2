import { TokenType } from '../../../lib/models/apiBuilder/types.token'
import { User } from './types'
import {
  UserCounters,
  UserInitialData,
  UserPrivateData,
  UserSecuredData,
  UserSubscription,
} from './types.parts'

export type ProfileResponse = User & UserCounters
export type MyProfileResponse = ProfileResponse &
  UserPrivateData & {
    subscription: UserSubscription | null
    identity_determined: boolean
  }

export type UserProfileResponse = ProfileResponse & {
  is_followed: boolean
  is_child: boolean
}
export type SignUpBody = {
  is_superuser: boolean
  is_manager: boolean
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
