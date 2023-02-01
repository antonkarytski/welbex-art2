import { CountryCode } from '../countries'
import { COUNTRIES } from '../countries/countriesList'

export function getCountry(country: CountryCode) {
  return COUNTRIES[country]
}

export function countryFullName(countryCode: CountryCode) {
  const country = getCountry(countryCode)
  return `${country.emoji} ${country.name}`
}
export function countryFullNameClipped(countryCode: CountryCode) {
  const country = getCountry(countryCode)
  const { name, emoji } = country
  const countryName = name.length > 10 ? name.slice(0, 10) + '...' : name
  return `${emoji} ${countryName}`
}
export function countryShortName(countryCode: CountryCode) {
  const country = getCountry(countryCode)
  return `${country.emoji} ${country.nativeName}`
}
