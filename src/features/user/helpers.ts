import moment from 'moment'
import { WinnerItem } from '../../api/parts/categories/types'
import { MyProfile, UserProfile } from '../../api/parts/users/types'
import {
  IdentityDocumentStatus,
  MyProfileResponse,
  SingUpResponseUser,
  UserProfileResponse,
} from '../../api/parts/users/types.api'
import { UserInitialData } from '../../api/parts/users/types.parts'
import { USER_DOB_FORMAT } from '../../constants'
import { LangStructure } from '../../translations/types'

export function userName(
  user: Pick<UserInitialData, 'first_name' | 'last_name'>,
  truncated: boolean = false,
  availableLettersCount: number = 17
) {
  let result = `${user.first_name} ${user.last_name}`
  if (truncated && result.length > availableLettersCount + 1) {
    result = result.slice(0, availableLettersCount) + '...'
  }
  return result
}

export function ageCategory(item: WinnerItem, text: LangStructure) {
  const { age_category } = item
  return `${age_category.min_age}-${age_category.max_age} ${text.yearsOldAbbreviated}`
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
    identity_determined_status_id: IdentityDocumentStatus.UNDETERMINED,
  }
}

export function prepareMyProfile(item: MyProfileResponse): MyProfile {
  return {
    ...item,
    age: userAge(item),
  }
}

export function profileResponseToUserProfile(
  profile: UserProfileResponse,
  id: number
): UserProfile {
  return {
    ...profile,
    id,
    age: userAge(profile),
  }
}

export function countFollowers(isFollowed: boolean, followers: number) {
  const minusFollower = followers === 0 ? 0 : followers - 1
  return isFollowed ? (followers += 1) : minusFollower
}
