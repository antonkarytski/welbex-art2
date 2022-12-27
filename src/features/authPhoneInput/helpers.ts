function removePlus(value: string) {
  if (value.startsWith('+')) return value.slice(1)
  return value
}

function addSpaces(rawValue: string) {
  const value = rawValue.replace(/ /g, '')
  if (value.length > 9) {
    const first = value.substring(0, 1)
    const second = value.substring(1, 4)
    const third = value.substring(4, 7)
    const fourth = value.substring(7, 9)
    const fifth = value.substring(9)
    return `${first} ${second} ${third} ${fourth} ${fifth}`
  }
  if (value.length > 7) {
    const first = value.substring(0, 1)
    const second = value.substring(1, 4)
    const third = value.substring(4, 7)
    const fourth = value.substring(7)
    return `${first} ${second} ${third} ${fourth}`
  }
  if (value.length > 4) {
    const first = value.substring(0, 1)
    const second = value.substring(1, 4)
    const third = value.substring(4)
    return `${first} ${second} ${third}`
  }
  if (value.length > 1) {
    const first = value.substring(0, 1)
    const second = value.substring(1)
    return `${first} ${second}`
  }
  return value
}

export function phoneSetMiddleware(phone: string): string {
  const woPlus = removePlus(phone)
  return addSpaces(woPlus)
}

export function phoneValidateMiddleware(phone: string): string {
  const validPhone = phone.replace(/[() -]/g, '')
  if (validPhone.length === 10) return `1${validPhone}`
  return validPhone
}
