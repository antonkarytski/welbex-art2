import countriesObj from '../../../assets/countriesObj.json'
import { Country } from './types'

export type CountryName = keyof typeof countriesObj
export const COUNTRIES: Record<CountryName, Country> = {
  ...countriesObj,
}
export const COUNTRIES_LIST: Country[] = Object.values(countriesObj)
