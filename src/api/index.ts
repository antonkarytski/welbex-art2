import { artsApi } from './parts/arts'
import { authApi } from './parts/auth'
import { categoriesApi } from './parts/categories'
import { usersApi } from './parts/users'
import { server } from './server'

export const api = {
  auth: authApi,
  users: usersApi,
  categories: categoriesApi,
  arts: artsApi,
  activeCategories: () => `${server.url}/categories/competitions/active/all`,

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
