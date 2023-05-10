import { AGE_CATEGORIES } from '../../constants/categories'

export type AgeCategory = { label: string; id: number }

const [_, ...ages] = AGE_CATEGORIES
export const ageCategories: AgeCategory[] = ages.map(([min, max], index) => ({
  label: `${min} - ${max}`,
  id: index + 1,
}))
