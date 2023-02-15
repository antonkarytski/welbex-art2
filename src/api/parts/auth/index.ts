import { ContentType } from '../../../lib/models/apiBuilder/types'
import { apiManager } from '../../apiManager'
import { LoginBody, LoginResponse } from './types'

const auth = apiManager.endpoint('auth')
const login = auth.post<LoginResponse, LoginBody>({
  contentType: ContentType.FORM,
  fn: ({ username, password }) => {
    const body = new FormData()
    body.append('username', username)
    body.append('password', password)
    return { url: 'token', body }
  },
})

export const authApi = {
  login,
}
