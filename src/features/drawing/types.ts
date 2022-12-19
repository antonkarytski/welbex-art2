import { ImageSourcePropType } from 'react-native'
import { User } from '../user/types'

export type Drawing = {
  image: ImageSourcePropType
  id: string
  user: User
  name: string
  likesCount: number
}
