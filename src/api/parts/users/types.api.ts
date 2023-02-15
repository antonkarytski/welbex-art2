import { TokenType } from '../../../lib/models/apiBuilder/types.token'
import {
  ProfileResponse,
  UserInitialData,
  UserPrivateData,
  UserSecuredData,
  UserSubscription,
} from './types.parts'

export type MyProfileResponse = ProfileResponse &
  UserPrivateData & {
    subscription: UserSubscription | null
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

export type SignUpResponse = {
  user: UserInitialData & UserPrivateData
  tokens: {
    access_token: string
    refresh_token: string
    token_type: TokenType
  }
}
