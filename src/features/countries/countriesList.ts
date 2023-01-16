import countriesObj from '../../../assets/countriesObj.json'
import { Country, CountryCode } from './types'

export const COUNTRIES: Record<CountryCode, Country> = {
  ...(countriesObj as Record<CountryCode, Country>),
}
export const COUNTRIES_LIST: Country[] = Object.values(COUNTRIES)
