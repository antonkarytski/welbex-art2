import { api } from '../../api'
import { UserShort } from '../../api/parts/users/types'

export const toggleFollow = (user: UserShort) => {
  const request = user.is_followed ? api.users.unfollow : api.users.follow
  return request(user.id)
}
