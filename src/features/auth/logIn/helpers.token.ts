import { LoginResponse } from '../../../api/parts/auth/types'
import { Tokens } from '../../../lib/models/apiBuilder/types.token'

export const tokenResponseToTokens = (
  tokenResponse: LoginResponse
): Tokens => ({
  access: tokenResponse.access_token,
  refresh: tokenResponse.refresh_token,
})
