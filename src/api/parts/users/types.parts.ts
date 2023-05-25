import { CountryCode } from '../../../features/countries'

export enum UserRole {
  COMMON = 1,
}

type UserTechCredits = {
  role_id: UserRole
  id: number
  is_superuser: boolean
}
export type UserCounters = {
  posts: number
  followings: number
  followers: number
}
export type UserSecuredData = {
  email: string
  phone_number: string
}

export type UserInitialData = {
  first_name: string
  last_name: string
  country: CountryCode
  DOB?: string | null
}

export type ProfileEditProps = Partial<UserInitialData & UserSecuredData>

export type UserPrivateData = UserTechCredits & UserSecuredData
