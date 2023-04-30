import { FnExt, OrArray } from '../../types'

export function toArray<T>(val: OrArray<T> | undefined): T[] {
  if (!val) return []
  if (Array.isArray(val)) return val
  return [val]
}

export function mapObject<T extends Record<string, any>, R>(
  obj: T,
  iterator: (value: T[keyof T], key: keyof T) => R
): Record<keyof T, R> {
  const list = {} as { [Key in keyof T]: R }
  for (let key in obj) {
    list[key] = iterator(obj[key], key)
  }
  return list
}

export function filterArrayBySearchString<T extends Record<string, any>>(
  array: T[],
  searchString: string,
  filterExtractor?: FnExt<T, string>,
  filterExtractorName = 'name'
) {
  return array.filter((item) => {
    const itemValueToCompare = filterExtractor
      ? filterExtractor(item)
      : item[filterExtractorName]

    return itemValueToCompare
      ?.toLowerCase()
      ?.includes(searchString.toLowerCase())
  })
}
