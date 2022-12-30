import { COUNTRIES, CountryName } from '../countries/countriesList'

export function getCountry(country: CountryName) {
  return COUNTRIES[country]
}

export function countryFullName(countryShort: CountryName) {
  const country = getCountry(countryShort)

  return `${country.emoji} ${country.name}`
}
