import { COUNTRIES, CountryCode } from '../countries/countriesList'

export function getCountry(country: CountryCode) {
  return COUNTRIES[country]
}

export function countryFullName(countryCode: CountryCode) {
  const country = getCountry(countryCode)
  return `${country.emoji} ${country.name}`
}
export function countryShortName(countryCode: CountryCode) {
  const country = getCountry(countryCode)
  return `${country.emoji} ${country.nativeName}`
}
