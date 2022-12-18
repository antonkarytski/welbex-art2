import { createEvent, createStore } from 'effector'
import { CompetitionCategoryDetails } from '../types'

type CategoriesDetailsList = Record<string, CompetitionCategoryDetails>

export const addCategoryToList = createEvent<CompetitionCategoryDetails>()
export const $categoriesDetails = createStore<CategoriesDetailsList | null>(
  null
).on(addCategoryToList, (state, payload) => {
  if (!state) return { [payload.name]: payload }
  return {
    ...state,
    [payload.name]: payload,
  }
})
