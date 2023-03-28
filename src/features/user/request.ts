import { api } from '../../api'
import { UserShort } from '../../api/parts/users/types'
import { createAuthSeparatedRequest } from '../auth/helpers'

export const getUserRequest = createAuthSeparatedRequest(
  api.users.profile,
  api.users.profileProtected
)

export const toggleFollow = (user: UserShort) => {
  const request = user.is_followed ? api.users.unfollow : api.users.follow
  return request(user.id)
}
