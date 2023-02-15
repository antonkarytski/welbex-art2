import { apiManager } from '../../apiManager'
import {
  MyProfileResponse,
  SignUpBody,
  SignUpResponse,
  UserProfileResponse,
} from './types.api'

const users = apiManager.endpoint('users').protect()
const me = users.get<MyProfileResponse>('me')
const signUp = users.post<SignUpResponse, SignUpBody>({
  endpoint: 'create',
  withToken: false,
})
const profile = users.get<UserProfileResponse, number>((id) => `${id}/profile`)
const follow = users.put<string, number>((id) => `${id}/follow`)
const unfollow = users.put<string, number>((id) => `${id}/unfollow`)

export const usersApi = {
  me,
  signUp,
  profile,
  uploadAvatar: null,
  follow,
  unfollow,
}
