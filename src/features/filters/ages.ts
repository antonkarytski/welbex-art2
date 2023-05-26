import { AGE_CATEGORIES } from '../../constants/categories'

export type AgeCategory = { label: string; id: number }

const [_, ...ages] = AGE_CATEGORIES

export function rangeToString(range: readonly [number, number]) {
  return `${range[0]} - ${range[1]}`
}
export const ageCategories: AgeCategory[] = ages.map((range, index) => ({
  label: rangeToString(range),
  id: index + 1,
}))
