import countriesObj from '../../../assets/countriesObj.json'
import { deviceCountryCode } from '../../lib/device/localization'
import { Country, CountryCode } from './types'

export const COUNTRIES: Record<CountryCode, Country> = {
  ...(countriesObj as Record<CountryCode, Country>),
}
export const COUNTRIES_LIST: Country[] = Object.values(COUNTRIES)
export const DEFAULT_COUNTRY_CODE: CountryCode = deviceCountryCode
export const DEFAULT_COUNTRY = COUNTRIES[DEFAULT_COUNTRY_CODE]
