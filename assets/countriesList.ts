import { Country } from '../src/features/countries/types'
import countriesObj from './countriesObj.json'

export const COUNTRIES: Record<keyof typeof countriesObj, Country> = {
  ...countriesObj,
}
export const COUNTRIES_LIST: Country[] = Object.values(countriesObj)
