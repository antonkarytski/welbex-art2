import { ImageSourcePropType } from 'react-native'
import { CountryName } from '../countries/countriesList'

export type User = {
  avatar: ImageSourcePropType
  name: string
  country: CountryName
  age: number
}
