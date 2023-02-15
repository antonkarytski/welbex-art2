import { days, minutes } from 'altek-toolkit'
import { ApiManager } from '../lib/models/apiBuilder/ApiManager'
import { request } from '../lib/models/apiBuilder/helpers'
import { TokenRefresher, Tokens } from '../lib/models/apiBuilder/types.token'
import { server } from './server'

const tokenRefresher: TokenRefresher = async ({ access, refresh }: Tokens) => {
  try {
    return await request<Tokens>({
      method: 'POST',
      url: `${server.url}/auth/refresh-tokens`,
      body: {
        access_token: access,
        refresh_token: refresh,
      },
    })
  } catch {
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
