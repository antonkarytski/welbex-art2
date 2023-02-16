import { usersEndpoint } from '../../api/parts/users/endpoint'
import { MyProfileResponse } from '../../api/parts/users/types.api'
import { prepareMyProfile } from '../user/helpers'
import { setMyProfile } from './model'

export const meRequest = usersEndpoint.get<MyProfileResponse>('me')
meRequest.done.watch(({ result }) => {
  setMyProfile(prepareMyProfile(result))
})
