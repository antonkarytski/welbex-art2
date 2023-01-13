import { CountryCode, isValidPhoneNumber } from 'libphonenumber-js'

export function validatePhone(
  phone: string,
  countryCode?: CountryCode | null
): boolean {
  return countryCode ? isValidPhoneNumber(phone, countryCode) : true
}
