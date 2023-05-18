import { attach, createEvent, restore } from 'effector'
import { api } from '../../api'
import { AvailableCategoriesResponse } from '../../api/parts/categories/types'
import { logOut } from '../auth/logOut/model'

export const setAvailableCategories = createEvent<AvailableCategoriesResponse>()
export const $availableCategories = restore(setAvailableCategories, null).reset(
  logOut
)
export const getAvailableCategories = attach({
  effect: api.categories.getAvailable,
})
getAvailableCategories.done.watch(({ result }) => {
  setAvailableCategories(result)
})
