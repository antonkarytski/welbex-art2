import { api } from '../../api'
import { UserProfileResponse } from '../../api/parts/users/types.api'

export const toggleFollow = (user: UserProfileResponse & { id: number }) => {
  const request = user.is_followed ? api.users.unfollow : api.users.follow
  return request(user.id)
}
