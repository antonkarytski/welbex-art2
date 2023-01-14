import { CurrentSubscription } from '../subscriptionPlans/types'
import { UserExt } from '../user/types'

export type UserProfile = {
  email: string
  subscription: CurrentSubscription | null
} & UserExt
