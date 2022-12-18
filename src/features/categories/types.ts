import { ImageSourcePropType } from 'react-native'
import { Drawing } from '../../drawing/types'

export type CompetitionCategory = {
  label: string
  name: string
  image: ImageSourcePropType
  term: string
  description: string
}

export type CompetitionCategoryDetails = CompetitionCategory & {
  images: Drawing[]
}
