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
  fn: (categories, selectedCategory) => {
    if (!categories || !selectedCategory) return null
    if (
      categories.current_month.find((id) => id === selectedCategory.id) ||
      categories.next_month.find((id) => id === selectedCategory.id)
    ) {
      return
    }
    return null
  },
}).watch((result) => {
  if (result === null) selectedCategoryModel.reset()
})
