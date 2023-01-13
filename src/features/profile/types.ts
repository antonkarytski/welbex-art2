import { User, UserExt } from '../user/types'

export type UserProfile = {
  email: string
  subscriptionExpiresIn: number | null
} & UserExt
