import {
  createEndpoint,
  createPost,
} from '../../lib/models/apiBuilder/Endpoint'
import { server } from '../server'
import { LoginProps, RefreshTokenProps, User } from './types'

const authEndpoint = createEndpoint(`${server.url}/auth`)

export const login = authEndpoint.post<LoginProps>()

export const refreshToken = authEndpoint.post<RefreshTokenProps>()

export const signUp = createPost(
  `${server.url}/users/create`,
  (user: User) => ({
    body: user,
  })
)
