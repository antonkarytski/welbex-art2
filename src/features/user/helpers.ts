import moment from 'moment'
import { MyProfile } from '../../api/parts/users/types'
import {
  MyProfileResponse,
  SingUpResponseUser,
} from '../../api/parts/users/types.api'
import { UserInitialData } from '../../api/parts/users/types.parts'
import { USER_DOB_FORMAT } from '../../constants'

export function userName(
  user: Pick<UserInitialData, 'first_name' | 'last_name'>
) {
  return `${user.first_name} ${user.last_name}`
}

export function userAge(user: Pick<UserInitialData, 'DOB'>) {
  const today = moment()
  const birthDay = moment(user.DOB, USER_DOB_FORMAT)
  return today.diff(birthDay, 'year')
}

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

export function prepareMyProfile(item: MyProfileResponse): MyProfile {
  return {
    ...item,
    age: userAge(item),
  }
}
