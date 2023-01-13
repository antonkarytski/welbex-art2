import countriesObj from '../../../assets/countriesObj.json'
import { Country } from './types'

export type CountryCode = keyof typeof countriesObj
// @ts-ignore
export const COUNTRIES: Record<CountryCode, Country> = {
  ...countriesObj,
}
export const COUNTRIES_LIST: Country[] = Object.values(COUNTRIES)
