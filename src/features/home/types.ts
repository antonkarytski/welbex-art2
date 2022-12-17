import { ImageSourcePropType } from 'react-native'

export type IWinner = {
  id: string
  image: ImageSourcePropType
  category: string
  yearsCategory: string
  authorName: string
  country: string
  imageOffsetY?: number
}
