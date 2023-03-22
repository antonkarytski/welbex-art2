import { artsApi } from './parts/arts'
import { authApi } from './parts/auth'
import { categoriesApi } from './parts/categories'
import { resetPasswordApi } from './parts/resetPassword'
import { usersApi } from './parts/users'

export const api = {
  auth: authApi,
  users: usersApi,
  categories: categoriesApi,
  arts: artsApi,
  resetPassword: resetPasswordApi,
}
