import {
  ApiError,
  ApiManager,
  createRequestRepeatFilter,
  createTokenRefresher,
  request,
} from '@heyheyjude/toolkit'
import { days, minutes } from 'altek-toolkit'
import { LoginResponse } from './parts/auth/types'
import { server } from './server'

const tokenRefresher = createTokenRefresher(async ({ access, refresh }) => {
  try {
    const response = await request<LoginResponse>({
      method: 'POST',
      url: () => `${server.api}/auth/refresh-tokens`,
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
})

const requestRepeatFilter = createRequestRepeatFilter(
  async (props, response, ctx) => {
    if (Number(response.status) !== 401 || !props.withToken || props.attempt) {
      return
    }
    if (response.headers.get('content-type') !== 'application/json') return
    const json = await response.json()
    if (json.data?.detail !== 'Could not validate credentials') {
      return
    }
    const newToken = await ctx.token.refresh()
    if (!newToken) throw ApiError.needLogin()
    return {
      ...props,
      token: newToken.access,
      attempt: props.attempt ? props.attempt + 1 : 1,
    }
  }
)

export const apiManager = new ApiManager({
  server,
  tokenSettings: {
    accessLifeTime: minutes(30),
    refreshLifeTime: days(30),
  },
  tokenRefresher,
  requestRepeatFilter,
})

if (__DEV__) {
  apiManager.debug()
}
