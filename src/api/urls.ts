import { server } from './server'

// TODO: delete this file
export const urls = {
  login: () => `${server.url}/auth/token`,
  refreshToken: () => `${server.url}/auth/refresh-tokens`,
  currentUser: () => `${server.url}/users/me`,
  createUser: () => `${server.url}/users/create`,
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
