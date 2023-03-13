import { ImageSourcePropType } from 'react-native'
import {
  MyProfileResponse,
  ProfileResponse,
  UserProfileResponse,
} from './types.api'
import { UserInitialData } from './types.parts'

export type User = UserInitialData & {
  avatar: ImageSourcePropType | string
}

export type AppUserProps = {
  id: number
  age: number
}

export type UserShort = {
  is_followed?: boolean
} & User &
  AppUserProps

export type Profile = ProfileResponse & AppUserProps
export type MyProfile = MyProfileResponse & AppUserProps
export type UserProfile = UserProfileResponse & AppUserProps
