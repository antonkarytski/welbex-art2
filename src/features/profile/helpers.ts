import { MyProfile } from '../../api/parts/users/types'
import { MyProfileResponse } from '../../api/parts/users/types.api'
import { userAge } from '../user/helpers'

export function prepareMyProfile(item: MyProfileResponse): MyProfile {
  return {
    ...item,
    age: userAge(item),
  }
}
