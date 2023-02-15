import { CountryCode } from '../../../features/countries'
import { TokenType } from '../../../lib/models/apiBuilder/types.token'

enum UserRole {
  COMMON = 1,
}

export type UserCommonBody = {
  email: string
  phone_number: string
  first_name: string
  last_name: string
  is_superuser: boolean
  country: CountryCode
  DOB: string
}

export type User = {
  role_id: UserRole
  id: number
} & UserCommonBody

export type MeResponse = {
  avatar: string
} & User

export type SignUpBody = {
  is_manager: boolean
  password: string
} & UserCommonBody

export type SignUpResponse = {
  user: User
  tokens: {
    access_token: string
    refresh_token: string
    token_type: TokenType
  }
}
