import { sample } from 'effector'
import { createStateModel } from 'altek-toolkit'
import { CategoryResponse } from '../../api/parts/categories/types'
import { $availableCategories } from '../profile/model.availableCategories'
import { createPostFormModel } from './model'

export const selectedCategoryModel = createStateModel<null | CategoryResponse>(
  null
)

selectedCategoryModel.$state.watch((value) => {
  if (!value) return
  createPostFormModel.setField({
    value: value.id,
    key: createPostFormModel.fields.categoryId,
  })
})

sample({
  source: $availableCategories,
  clock: selectedCategoryModel.$state,
  fn: (available, selected) => {
    if (!available || !selected) return null
    if (
      available.current_month.find((id) => id === selected.id) ||
      available.next_month.find((id) => id === selected.id)
    ) {
      return
    }
    return null
  },
}).watch((result) => {
  if (result === null) selectedCategoryModel.reset()
})
