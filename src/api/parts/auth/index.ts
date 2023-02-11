import { apiManager } from '../../apiManager'
import { LoginBody, LoginResponse } from './types'

const auth = apiManager.endpoint('auth')
const login = auth.post<LoginResponse, LoginBody>('token')

export const authApi = {
  login,
}
