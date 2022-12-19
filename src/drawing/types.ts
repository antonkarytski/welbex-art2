import { ImageSourcePropType } from 'react-native'
import { User } from '../features/user/types'

export type Drawing = {
  image: ImageSourcePropType
  id: string
  user: User
}
