import { apiManager } from './apiManager'
import { artsApi } from './parts/arts'
import { authApi } from './parts/auth'
import { categoriesApi } from './parts/categories'
import { usersApi } from './parts/users'

export const api = {
  auth: authApi,
  users: usersApi,
  categories: categoriesApi,
  arts: artsApi,
}

apiManager.token.onInit((token) => {
  if (token) return usersApi.me()
})
