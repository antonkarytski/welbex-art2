import { ImageSourcePropType } from 'react-native'
import { User } from '../user/types'

export type IWinner = {
  id: string
  image: ImageSourcePropType
  category: string
  yearsCategory: string
  imageOffsetY?: number
  author: User
}
