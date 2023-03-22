import { apiManager } from '../../apiManager'
import { LoginResponse } from '../auth/types'

type ResetPasswordProps = {
  token: string
  password: string
}

const endpoint = apiManager.endpoint('reset-password')
const sendResetLink = endpoint.get<void, string>((email) => ({
  url: 'send-reset-link',
  body: { email: email.toLowerCase() },
}))
const reset = endpoint.patch<LoginResponse, ResetPasswordProps>(
  ({ token, password }) => ({ url: `?token=${token}`, body: { password } })
)

export const resetPasswordApi = {
  sendResetLink,
  reset,
}
