import { ImageSourcePropType } from 'react-native'
import { Country } from '../countries/countries'

export type User = {
  avatar: ImageSourcePropType
  name: string
  country: Country
  age: number
}
