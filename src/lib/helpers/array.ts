import { nanoid } from 'nanoid'
import { FnExt, OrArray, WithUniq } from '../../types'

export function generateNumbersArray(min: number, max: number, step: number) {
  const length = Math.floor((max - min) / step) + 1
  return Array.from({ length }, (_, index) => {
    return Math.round((index * step + min) * 100) / 100
  })
}

export function generateMultistepArray(
  steps: { min: number; max: number; step: number }[]
) {
  return steps.reduce((acc, { min, max, step }) => {
    const stepArray = generateNumbersArray(min, max, step)
    return [...acc, ...stepArray]
  }, [] as number[])
}

export function addUniqFields<I extends object>(messages: I[]): WithUniq<I>[] {
  return messages.map((message) => ({
    ...message,
    uniqId: nanoid(),
  }))
}

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
