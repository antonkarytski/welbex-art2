import countriesObj from '../../../assets/countriesObj.json'
import { Country, CountryCode } from './types'

const typedCountriesObj = countriesObj as Record<CountryCode, Country>

export const COUNTRIES: Record<CountryCode, Country> = {
  ...typedCountriesObj,
}
export const COUNTRIES_LIST: Country[] = Object.values(COUNTRIES)
