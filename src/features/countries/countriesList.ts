import countriesObj from '../../../assets/countriesObj.json'
import { Country } from './types'

export type CountryCode = keyof typeof countriesObj
export const COUNTRIES: Record<CountryCode, Country> = {
  ...countriesObj,
}
export const COUNTRIES_LIST: Country[] = Object.values(countriesObj)
