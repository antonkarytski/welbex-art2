import { AGE_CATEGORIES_MAP } from '../../constants/categories'

export function getAgeCategory(age: number) {
  return AGE_CATEGORIES_MAP[age] ?? [0, 0]
}
