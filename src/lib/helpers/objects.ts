export const isObject = (value: any) => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export const isObjectFullfiled = (
  object: Record<string, string | number | any[] | null | undefined>
) => {
  const emptyValue = Object.values(object).find((value) => {
    if (value === (null || undefined)) return true
    if (typeof value === 'string') return value === ''
    if (Array.isArray(value)) return value.length === 0
  })
  return !emptyValue
}
