import { days, minutes } from 'altek-toolkit'
import { ApiManager } from '../lib/models/apiBuilder/ApiManager'
import { request } from '../lib/models/apiBuilder/helpers'
import { TokenRefresher, Tokens } from '../lib/models/apiBuilder/types.token'
import { LoginResponse } from './parts/auth/types'
import { server } from './server'

const tokenRefresher: TokenRefresher = async ({ access, refresh }: Tokens) => {
  try {
    const response = await request<LoginResponse>({
      method: 'POST',
      url: `${server.api}/auth/refresh-tokens`,
      body: {
        access_token: access,
        refresh_token: refresh,
      },
    })
    return {
      access: response.access_token,
      refresh: response.refresh_token,
      type: response.token_type,
    }
  } catch (e) {
    return null
  }
}

export const apiManager = new ApiManager({
  tokenRefresher,
  server,
  tokenSettings: {
    accessLifeTime: minutes(30),
    refreshLifeTime: days(30),
  },
}).debug()
