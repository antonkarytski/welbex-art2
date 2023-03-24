import { ContentType } from '../../../lib/models/apiBuilder/types'
import { apiManager } from '../../apiManager'
import { LoginBody, LoginResponse } from './types'

const auth = apiManager.endpoint('auth')
const login = auth.post<LoginResponse, LoginBody>({
  contentType: ContentType.FORM_ENCODED,
  endpoint: 'token',
})
const googleAuth = auth.get('google/oauth2')
const appleAuth = auth.get('apple/oauth2')

export const authApi = {
  login,
  googleAuth,
  googleAuthUrl: googleAuth.url(),
  appleAuth,
  appleAuthUrl: appleAuth.url(),
}
