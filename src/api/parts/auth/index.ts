import { ContentType } from '../../../lib/models/apiBuilder/types'
import { apiManager } from '../../apiManager'
import { LoginBody, LoginResponse } from './types'

const authEndpoint = apiManager.endpoint('auth')

const login = authEndpoint.post<LoginResponse, LoginBody>({
  contentType: ContentType.FORM_ENCODED,
  endpoint: 'token',
})

export const authApi = {
  login,
}
