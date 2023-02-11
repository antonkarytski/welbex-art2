import { TokenType } from '../../../lib/models/apiBuilder/types.token'

enum UserRole {
  COMMON = 0,
}

export type MeResponse = {
  email: string
  phone_number: string
  is_superuser: boolean
  first_name: string
  last_name: string
  role_id: UserRole
  country: string
  DOB: string
  id: number
  avatar: string
}

export type SignUpBody = {
  email: string
  phone_number: string
  is_superuser: boolean
  is_manager: boolean
  first_name: string
  last_name: string
  country: string
  password: string
  DOB: string
}

export type User = {
  email: string
  phone_number: string
  is_superuser: boolean
  first_name: string
  last_name: string
  role_id: number
  country: string
  DOB: string
  id: number
}

export type SignUpResponse = {
  user: User
  tokens: {
    access_token: string
    refresh_token: string
    token_type: TokenType
  }
}
