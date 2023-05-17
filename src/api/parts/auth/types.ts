import { TokenType } from '@heyheyjude/toolkit'

export type LoginBody = {
  grant_type?: string
  username: string
  password: string
  scope?: string
  client_id?: string
  client_secret?: string
}

export type LoginResponse = {
  access_token: string
  refresh_token: string
  token_type: TokenType
}
