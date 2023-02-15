import { ImageSourcePropType } from 'react-native'
import { UserShort } from '../../api/parts/users/types'

export type IWinner = {
  id: string
  image: ImageSourcePropType
  category: string
  yearsCategory: string
  imageOffsetY?: number
  author: UserShort
}
