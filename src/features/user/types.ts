import { ImageSourcePropType } from 'react-native'
import { CountryCode } from '../countries/countriesList'

export type User = {
  id: string
  avatar: ImageSourcePropType
  name: string
  country: CountryCode
  age: number
}

export type UserExt = User & {
  following_count: number
  followers_count: number
  postsCount: number
}

export enum UserDrawingListType {
  OWN = 'own',
  LIKED = 'liked',
  SAVED = 'saved',
}
