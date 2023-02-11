import { apiManager } from '../../apiManager'
import { MeResponse, SignUpBody, SignUpResponse, User } from './types'

const users = apiManager.endpoint('users').protect()
const me = users.get<MeResponse>({
  endpoint: 'me',
})
const signUp = users.post<SignUpResponse, SignUpBody>({
  endpoint: 'create',
  withToken: false,
})
const profile = users.get<User, number>((id) => ({ url: `${id}/profile` }))
const follow = users.put<string, number>((id) => ({ url: `${id}/follow` }))
const unfollow = users.get<string, number>((id) => ({ url: `${id}/unfollow` }))

export const usersApi = {
  me,
  signUp,
  profile,
  uploadAvatar: null,
  follow,
  unfollow,
}
