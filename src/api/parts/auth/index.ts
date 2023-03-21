import { ContentType } from '../../../lib/models/apiBuilder/types'
import { apiManager } from '../../apiManager'
import { LoginBody, LoginResponse } from './types'

const auth = apiManager.endpoint('auth')
const login = auth.post<LoginResponse, LoginBody>({
  contentType: ContentType.FORM_ENCODED,
  endpoint: 'token',
})

const googleAuth = auth.get('google/oauth2')
const googleAuthUrl = googleAuth.url()

const appleAuth = auth.get('apple/oauth2')
const appleAuthUrl = appleAuth.url()

export const authApi = {
  login,
  googleAuth,
  googleAuthUrl,
  appleAuth,
  appleAuthUrl,
}
