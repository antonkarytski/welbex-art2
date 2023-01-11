import { User, UserExt } from '../features/user/types'

export const romanov: User = {
  id: '001',
  avatar: require('../../assets/images/avatar.png'),
  country: 'RU',
  name: 'Sergey Romanov',
  age: 10,
}

export const reginaRomanova: User = {
  id: '002',
  avatar: require('../../assets/images/avatar.png'),
  name: 'Regina Romanova',
  country: 'RU',
  age: 10,
}

export const romanovFull: UserExt = {
  ...romanov,
  following_count: 111,
  followers_count: 222,
  postsCount: 55,
}

export const reginaRomanovaFull: UserExt = {
  ...reginaRomanova,
  following_count: 120,
  followers_count: 100,
  postsCount: 60,
}

export const USERS_FULL = [romanovFull, reginaRomanovaFull]
