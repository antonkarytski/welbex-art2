import { apiManager } from './apiManager'
import { server } from './server'
import { LoginBody, LoginResponse } from './types/auth'
import { MeResponse, SignUpBody, SignUpResponse, User } from './types/users'

const auth = apiManager.endpoint('auth')
const login = auth.post<LoginResponse, LoginBody>({
  endpoint: 'token',
})

const users = apiManager.endpoint('users').protect()
const me = users.get<MeResponse>({
  endpoint: 'me',
})
const signUp = users.post<SignUpResponse, SignUpBody>({
  endpoint: 'create',
  withToken: false,
})
const userProfile = users.get<User, number>({
  fn: (id) => {
    return {
      url: `${id}/profile`,
    }
  },
})

export const api = {
  login,
  me,
  signUp,
  userProfile,
  uploadUserAvatar: () => `${server.url}/users/upload-avatar`,
  user: (id: number) => `${server.url}/users/${id}/profile`,
  followUser: (id: number) => `${server.url}/users/${id}/follow`,
  unfollowUser: (id: number) => `${server.url}/users/${id}/unfollow`,

  category: (id: number) => `${server.url}/categories/${id}`,
  categories: () => `${server.url}/categories/all`,
  activeCategories: () => `${server.url}/categories/competitions/active/all`,
  winners: () => `${server.url}/categories/winners`,

  post: (id: number) => `${server.url}/arts/${id}`,
  createPost: () => `${server.url}/arts/create`,
  likePost: (id: number) => `${server.url}/arts/${id}/like`,
  dislikePost: (id: number) => `${server.url}/arts/${id}/remove-like`,
  savePost: (id: number) => `${server.url}/arts/${id}/save`,
  unsavePost: (id: number) => `${server.url}/arts/${id}/unsave`,
  userPostsAll: (id: number) => `${server.url}/arts/user/${id}/all`,
  userPostsLiked: (id: number) => `${server.url}/arts/user/${id}/liked`,
  userPostsSaved: (id: number) => `${server.url}/arts/user/${id}/saved`,
}
