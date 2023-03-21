import { apiManager } from '../../apiManager'
import { SignUpResponse } from '../users/types.api'

type ResetPasswordProps = {
  token: string
  password: string
}

const endpoint = apiManager.endpoint('reset-password')
const sendResetLink = endpoint.get<void, string>((email) => ({
  url: 'send-reset-link',
  body: { email: email.toLowerCase() },
}))
const reset = endpoint.patch<SignUpResponse, ResetPasswordProps>(
  ({ token, password }) => ({
    url: `reset-password/${token}`,
    body: { password },
  })
)

export const resetPasswordApi = {
  sendResetLink,
  reset,
}
