import { attach, createEvent, restore } from 'effector'
import { api } from '../../api'
import { AvailableCategoriesResponse } from '../../api/parts/categories/types'

export const setAvailableCategories = createEvent<AvailableCategoriesResponse>()
export const $availableCategories = restore(setAvailableCategories, {
  current_month: [2, 3, 4, 5, 6, 7],
  next_month: [1, 2, 3, 8, 16],
})

$availableCategories.watch((e) => {
  console.log(e)
})

export const getAvailableCategories = attach({
  effect: api.categories.getAvailable,
})
getAvailableCategories.done.watch(({ result }) => {
  console.log(result)
  //setAvailableCategories(result)
})
