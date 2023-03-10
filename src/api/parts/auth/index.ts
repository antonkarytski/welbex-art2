import { ContentType } from '../../../lib/models/apiBuilder/types'
import { apiManager } from '../../apiManager'
import { LoginBody, LoginResponse } from './types'

const auth = apiManager.endpoint('auth')
const login = auth.post<LoginResponse, LoginBody>({
  contentType: ContentType.FORM_ENCODED,
  endpoint: 'token',
})

const google = auth.endpoint('google')
const googleAuth = google.get<string>({
  endpoint: 'oauth2',
})
const googleAuthCallback = google.get<string>('oauth2callback')

export const authApi = {
  login,
  googleAuth,
  googleAuthCallback,
}
