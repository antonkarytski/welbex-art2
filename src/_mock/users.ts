import { UserProfile, UserShort } from '../api/parts/users/types'

type MockUser = UserShort & {
  id: number
}
export const romanov: MockUser = {
  id: 1,
  avatar: require('../../assets/images/avatar.png'),
  country: 'RU',
  first_name: 'Sergey',
  last_name: 'Romanov',
  is_followed: true,
  age: 10,
}

export const reginaRomanova: MockUser = {
  id: 2,
  avatar: require('../../assets/images/avatar.png'),
  first_name: 'Regina',
  last_name: 'Romanova',
  is_followed: false,
  country: 'RU',
  age: 10,
}

export const romanovFull: UserProfile = {
  ...romanov,
  followings: 111,
  followers: 222,
  posts: 55,
  DOB: '2012-01-01',
  is_child: true,
  is_followed: false,
}

export const reginaRomanovaFull: UserProfile = {
  ...reginaRomanova,
  followings: 120,
  followers: 100,
  posts: 60,
  DOB: '2014-01-01',
  is_child: true,
  is_followed: true,
}

export const USERS_FULL = [romanovFull, reginaRomanovaFull]
