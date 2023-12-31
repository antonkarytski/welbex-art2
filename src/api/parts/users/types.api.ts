import { TokenType } from '@heyheyjude/toolkit'
import { SubscriptionResponse } from '../subscriptions/types'
import { User } from './types'
import {
  UserCounters,
  UserInitialData,
  UserPrivateData,
  UserSecuredData,
} from './types.parts'

export enum IdentityDocumentStatus {
  UNDETERMINED = 1,
  PENDING,
  DETERMINED,
  REJECTED,
  JUST_UPLOADED = 10,
}

export type ProfileResponse = User & UserCounters
export type MyProfileResponse = ProfileResponse &
  UserPrivateData & {
    subscription: SubscriptionResponse | null
    identity_determined_status_id: IdentityDocumentStatus
    is_child: boolean
  }

export type UserProfileResponse = ProfileResponse & {
  is_followed: boolean
  is_child: boolean
}
export type SignUpBody = {
  password: string
} & UserInitialData &
  UserSecuredData

export type SingUpResponseUser = UserInitialData &
  UserPrivateData & {
    is_child: boolean
  }

export type SignUpResponse = {
  user: SingUpResponseUser
  tokens: {
    access_token: string
    refresh_token: string
    token_type: TokenType
  }
}
