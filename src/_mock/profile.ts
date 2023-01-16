import { days } from 'altek-toolkit'
import { UserProfile } from '../features/profile/types'
import { SUBSCRIPTION_PLANS } from '../features/subscriptionPlans/model'
import { romanov } from './users'

export const MOCK_PROFILE_WELBEX: UserProfile = {
  ...romanov,
  email: 'welbex@mail.ru',
  followers_count: 100,
  following_count: 200,
  postsCount: 100,
  subscription: {
    expiresIn: Date.now() + days(365),
    ...SUBSCRIPTION_PLANS[1],
  },
}
