import { combine } from 'effector'
import { apiManager } from '../../api/apiManager'
import { $myProfile } from '../profile/model'

export const $isAuth = combine(
  {
    token: apiManager.token.$store,
    profile: $myProfile,
  },
  ({ token, profile }) => !!token && !!profile
)
