import { createStateModel } from 'altek-toolkit'
import { CategoryResponse } from '../../api/parts/categories/types'
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
