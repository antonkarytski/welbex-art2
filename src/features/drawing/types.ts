import { ImageSourcePropType } from 'react-native'
import { UserShort } from '../../api/parts/users/types'

export type Drawing = {
  image: ImageSourcePropType
  id: string
  user: UserShort
  name: string
  likesCount: number
  isLiked: boolean
  isSaved: boolean
}
