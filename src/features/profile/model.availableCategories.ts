import { attach, createEvent, restore } from 'effector'
import { api } from '../../api'

export const setAvailableCategories = createEvent<any>()
export const $availableCategories = restore(setAvailableCategories, null)

$availableCategories.watch((e) => {
  console.log(e)
})

export const getAvailableCategories = attach({
  effect: api.categories.getAvailable,
})
getAvailableCategories.done.watch(({ result }) => {
  setAvailableCategories(result)
})
