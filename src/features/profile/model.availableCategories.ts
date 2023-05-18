import { attach, createEvent, restore } from 'effector'
import { api } from '../../api'
import { AvailableCategoriesResponse } from '../../api/parts/categories/types'
import { logOut } from '../auth/logOut/model'

type RemoveCategoryProps = {
  nextMonth: boolean
  id: number
}
export const setAvailableCategories = createEvent<AvailableCategoriesResponse>()
export const removeCategoryFromAvailable = createEvent<RemoveCategoryProps>()
export const $availableCategories = restore(setAvailableCategories, null)
  .on(removeCategoryFromAvailable, (state, payload) => {
    if (!state) return null
    const { nextMonth, id } = payload
    const key = nextMonth ? 'next_month' : 'current_month'
    const categories = state[key]
    const index = categories.findIndex((item) => item === id)
    if (index === -1) return state
    categories.splice(index, 1)
    return { ...state, [key]: [...categories] }
  })
  .reset(logOut)
export const getAvailableCategories = attach({
  effect: api.categories.getAvailable,
})
getAvailableCategories.done.watch(({ result }) => {
  setAvailableCategories(result)
})
