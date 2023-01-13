import parsePhoneNumber, { CountryCode } from 'libphonenumber-js'

export function removePlus(result: string) {
  if (result.startsWith('+')) return result.slice(1)
  return result
}

export function addPlus(result: string) {
  if (result?.length > 1 && !result.startsWith('+')) return '+'.concat(result)
  return result
}

export function formatPhone(
  rawValue: string,
  countryCode?: CountryCode | null
) {
  console.log('formatPhone', countryCode)
  let result = rawValue
  if (countryCode) {
    // result = addPlus(rawValue)
    const phoneNumber = parsePhoneNumber(result, countryCode)
    if (phoneNumber) {
      const formattedPhone = phoneNumber.format('INTERNATIONAL')
      console.log('INTERNATIONAL', formattedPhone)
      result = String(formattedPhone)
    }
    return result
  }
  result = rawValue.replace(/ /g, '')
  if (result.length > 9) {
    const first = result.substring(0, 1)
    const second = result.substring(1, 4)
    const third = result.substring(4, 7)
    const fourth = result.substring(7, 9)
    const fifth = result.substring(9)
    return `${first} ${second} ${third} ${fourth} ${fifth}`
  }
  if (result.length > 7) {
    const first = result.substring(0, 1)
    const second = result.substring(1, 4)
    const third = result.substring(4, 7)
    const fourth = result.substring(7)
    return `${first} ${second} ${third} ${fourth}`
  }
  if (result.length > 4) {
    const first = result.substring(0, 1)
    const second = result.substring(1, 4)
    const third = result.substring(4)
    return `${first} ${second} ${third}`
  }
  if (result.length > 1) {
    const first = result.substring(0, 1)
    const second = result.substring(1)
    return `${first} ${second}`
  }

  return result
}

export function purifyPhone(phone: string): string {
  const validPhone = phone.replace(/[() -]/g, '')
  return validPhone
}
