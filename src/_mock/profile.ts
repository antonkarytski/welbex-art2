import { UserProfile } from '../features/profile/types'
import { romanov } from './users'

export const MOCK_PROFILE_WELBEX: UserProfile = {
  ...romanov,
  email: 'welbex@mail.ru',
  followers_count: 100,
  following_count: 200,
  postsCount: 100,
}
