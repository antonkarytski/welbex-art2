export const isObject = (value: any) => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export const isObjectFullfiled = (
  object: Record<string, string | number | any[] | null | undefined>
) => {
  const emptyValues = Object.values(object).filter((value) => {
    if (value === (null || undefined)) return true
    if (typeof value === 'string') return value === ''
    if (Array.isArray(value)) return value.length === 0
  })
  return !(emptyValues.length > 0)
}

export const renameObjectKeys = <
  T extends Record<string, any>,
  U extends string
>(
  obj: T,
  keysToReplace: Partial<Record<keyof T, U>>
) => {
  let result = {} as { [Key in U]: T[keyof T] }
  for (let key in obj) {
    const keyToReplace = keysToReplace[key]
    if (keyToReplace) {
      result[keyToReplace] = obj[key]
    }
  }
  return result
}

const stringify = <T>(value: T) =>
  typeof value === 'object' ? JSON.stringify(value) : value?.toString()

export const checkObjectsChanges = <T extends Record<string, any>>(
  dataBefore: T,
  dataAfter: Partial<T>,
  replacerForComparing?: (key: string, value: T[keyof T]) => any
) => {
  let dataBeforeTyped: Partial<Record<keyof T, string>> = {}
  let dataAfterTyped: Partial<Record<keyof T, string>> = {}
  let changes: Partial<T> | null = {}

  const replacedDataBefore = JSON.stringify(dataBefore, replacerForComparing)
  const replacedDataAfter = JSON.stringify(dataAfter, replacerForComparing)

  if (replacedDataBefore !== replacedDataAfter) {
    dataBeforeTyped = replacedDataBefore ? JSON.parse(replacedDataBefore) : {}
    dataAfterTyped = replacedDataAfter ? JSON.parse(replacedDataAfter) : {}
  }
  for (const key in dataAfter) {
    const valueBefore = dataBeforeTyped?.[key]
    const valueAfter = dataAfterTyped?.[key]
    if (valueBefore) dataBeforeTyped[key] = stringify(valueBefore)
    if (valueAfter) dataAfterTyped[key] = stringify(valueAfter)

    const isEmptyBeforeAndAfter = !dataAfter?.[key] && !dataBefore?.[key]
    const notEqual =
      dataAfterTyped?.[key] !== dataBeforeTyped?.[key] && !isEmptyBeforeAndAfter

    if (notEqual) {
      changes[key] = dataAfter[key]
    }
  }
  if (!Object.values(changes)?.length) {
    changes = null
  }
  return changes
}
