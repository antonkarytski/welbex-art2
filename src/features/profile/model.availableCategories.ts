import { attach, createEvent, restore } from 'effector'
import { api } from '../../api'
import { AvailableCategoriesResponse } from '../../api/parts/categories/types'

export const setAvailableCategories = createEvent<AvailableCategoriesResponse>()
export const $availableCategories = restore(setAvailableCategories, null)
export const getAvailableCategories = attach({
  effect: api.categories.getAvailable,
})
getAvailableCategories.done.watch(({ result }) => {
  setAvailableCategories(result)
})
