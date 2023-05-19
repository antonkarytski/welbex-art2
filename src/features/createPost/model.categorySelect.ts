import { combine } from 'effector'
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

combine({
  available: $availableCategories,
  selected: selectedCategoryModel.$state,
}).watch(({ available, selected }) => {
  if (!available && selected) return selectedCategoryModel.reset()
  if (
    !available ||
    !selected ||
    available.current_month.find((id) => id === selected.id) ||
    available.next_month.find((id) => id === selected.id)
  ) {
    return
  }
  selectedCategoryModel.reset()
})
