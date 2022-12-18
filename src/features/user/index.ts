import { COUNTIES_LIST, Country } from '../countries/countries'

export function getCountry(country: Country) {
  return COUNTIES_LIST[country]
}

export function countryFullName(countryShort: Country) {
  const country = getCountry(countryShort)

  return `${country.flag} ${country.fullName}`
}
