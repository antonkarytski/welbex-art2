import { ContentType } from '@heyheyjude/toolkit'
import { IS_IOS } from '../../../lib/helpers/native/constants'
import { apiManager } from '../../apiManager'
import { LoginBody, LoginResponse } from './types'

const auth = apiManager.endpoint('auth')
const login = auth.post<LoginResponse, LoginBody>({
  contentType: IS_IOS ? ContentType.FORM_ENCODED : ContentType.FORM_DATA,
  endpoint: 'token',
})
const googleAuth = auth.get('google/oauth2')
const appleAuth = auth.get('apple/oauth2')

export const authApi = {
  login,
  googleAuth,
  googleAuthUrl: googleAuth.url,
  appleAuth,
  appleAuthUrl: appleAuth.url,
}
