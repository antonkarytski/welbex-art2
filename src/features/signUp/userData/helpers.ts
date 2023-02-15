import { MyProfile } from '../../../api/parts/users/types'
import { SingUpResponseUser } from '../../../api/parts/users/types.api'
import { userAge } from '../../user/helpers'

export function signUpUserResponseToNewUser(
  user: SingUpResponseUser
): MyProfile {
  return {
    ...user,
    avatar: '',
    subscription: null,
    posts: 0,
    followers: 0,
    followings: 0,
    age: userAge(user),
  }
}
