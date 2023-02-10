import { isValidPhoneNumber } from 'libphonenumber-js'
import { CountryCode } from '../../../../features/countries'

export function validatePhone(
  phone: string,
  countryCode?: CountryCode | null
): boolean {
  return countryCode ? isValidPhoneNumber(phone, countryCode) : true
}
