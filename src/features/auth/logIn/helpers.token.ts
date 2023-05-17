import { Tokens } from '@heyheyjude/toolkit'
import { LoginResponse } from '../../../api/parts/auth/types'

export const tokenResponseToTokens = (
  tokenResponse: LoginResponse
): Tokens => ({
  access: tokenResponse.access_token,
  refresh: tokenResponse.refresh_token,
})
