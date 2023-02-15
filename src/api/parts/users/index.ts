import { meRequest } from '../../../features/profile/request'
import { usersEndpoint } from './endpoint'
import { SignUpBody, SignUpResponse, UserProfileResponse } from './types.api'

const signUp = usersEndpoint.post<SignUpResponse, SignUpBody>({
  endpoint: 'create',
  withToken: false,
})
const profile = usersEndpoint.get<UserProfileResponse, number>(
  (id) => `${id}/profile`
)
const follow = usersEndpoint.put<string, number>((id) => `${id}/follow`)
const unfollow = usersEndpoint.put<string, number>((id) => `${id}/unfollow`)

export const usersApi = {
  me: meRequest,
  signUp,
  profile,
  uploadAvatar: null,
  follow,
  unfollow,
}
