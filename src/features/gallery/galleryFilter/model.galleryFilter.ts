import { combine } from 'effector'
import { createStateModel } from 'altek-toolkit'
import { CategoryResponse } from '../../../api/parts/categories/types'
import { CATEGORIES_AGE_RANGE } from '../../../constants/categories'
import {
  createCountryModel,
  createSearchCountryModel,
} from '../../countries/model.countriesDropdown'

export const categoryModel = createStateModel<null | CategoryResponse>(null)
export const countryModel = createCountryModel()
export const countrySearchModel = createSearchCountryModel()

export const drawingNameModel = createStateModel('')
export const ageRangeModel = createStateModel(CATEGORIES_AGE_RANGE)

export const resetGalleryFilter = () => {
  categoryModel.set(null)
  countryModel.set(null)
  countrySearchModel.searchStringModel.set('')
  drawingNameModel.set('')
  ageRangeModel.set(CATEGORIES_AGE_RANGE)
}

export const $galleryFilterForm = combine(
  {
    category: categoryModel.$state,
    country: countryModel.$state,
    drawingName: drawingNameModel.$state,
    ageRange: ageRangeModel.$state,
  },
  ({ category, country, drawingName, ageRange }) => {
    return {
      category_id: category?.id,
      country: country?.alpha2Code,
      title: drawingName,
      min_age: ageRange[0],
      max_age: ageRange[1],
    }
  }
)
