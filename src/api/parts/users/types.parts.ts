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
  DOB: string
  is_child: boolean
}

export type UserPrivateData = UserTechCredits & UserSecuredData
export type UserSubscription = {
  expiresIn: number
  monthsAmount: number
  pricePerMonth: number
}
