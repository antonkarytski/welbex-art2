import { UserProfile } from '../features/profile/types'
import { romanov } from './users'

export const MOCK_PROFILE_WELBEX: UserProfile = {
  ...romanov,
  email: 'welbex@mail.ru',
}
