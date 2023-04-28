export const CATEGORIES_MAX_AGE = 13
export const CATEGORIES_MIN_AGE = 0
export const CATEGORIES_AGE_RANGE = [CATEGORIES_MIN_AGE, CATEGORIES_MAX_AGE]

export const AGE_CATEGORIES = [
  [0, 1],
  [2, 4],
  [5, 7],
  [8, 10],
  [11, 13],
] as const

export const AGE_CATEGORIES_MAP = AGE_CATEGORIES.reduce<
  Record<number, [number, number]>
>((acc, category) => {
  const [min, max] = category
  for (let i = min; i <= max; i++) {
    acc[i] = category as [number, number]
  }
  return acc
}, {})
