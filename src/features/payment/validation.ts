export function validateExpirationDate(expirationDate: string): boolean {
  const expirationDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/
  if (!expirationDateRegex.test(expirationDate)) {
    return false
  }
  const parts = expirationDate.split('/')
  const month = parseInt(parts[0], 10)
  const year = parseInt(parts[1], 10) + 2000
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1
  return !(year < currentYear || (year === currentYear && month < currentMonth))
}

export function cleanExpirationDate(expirationDate: string): string {
  let cleanedDate = expirationDate.replace(/\D/g, '')
  if (cleanedDate.length > 4) {
    cleanedDate = cleanedDate.substring(0, 4)
  }
  if (cleanedDate.length === 4) {
    cleanedDate = `${cleanedDate.substring(0, 2)}/${cleanedDate.substring(2)}`
  }
  return cleanedDate
}

export const cvvRegexTest = /^\d{3,4}$/
export function cleanCvv(cvv: string): string {
  return cvv.replace(/\D/g, '').substring(0, 4)
}
export function validateCvv(cvv: string): boolean {
  return cvvRegexTest.test(cvv)
}

const luhnCheck = (num: string): boolean => {
  const arr = num
    .split('')
    .reverse()
    .map((x) => parseInt(x, 10))
  const lastDigit = arr.splice(0, 1)[0]
  const sum = arr.reduce(
    (acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9)),
    0
  )
  return (sum + lastDigit) % 10 === 0
}

const CARD_NUMBER_MAX_LENGTH = 18
export const cleanCardNumber = (value: string): string => {
  const cleanedValue = value.replace(/\D/g, '').slice(0, CARD_NUMBER_MAX_LENGTH)
  const segments: string[] = []
  for (let i = 0; i < cleanedValue.length; i += 4) {
    segments.push(cleanedValue.slice(i, i + 4))
  }
  return segments.join(' ')
}

export const validateCardNumber = (value: string): boolean => {
  const cleanedValue = cleanCardNumber(value)
  return (
    /^\d{4}( \d{4}){3}$/.test(cleanedValue) &&
    luhnCheck(cleanedValue.replace(/\s/g, ''))
  )
}
