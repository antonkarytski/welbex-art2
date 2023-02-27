import { createStateModel } from 'altek-toolkit'
import { CategoryResponse } from '../../../api/parts/categories/types'
import {
  createCountryModel,
  createSearchCountryModel,
} from '../../countries/model.countriesDropdown'

export const categoryModel = createStateModel<null | CategoryResponse>(null)
export const countryModel = createCountryModel()
export const countrySearchModel = createSearchCountryModel()

export const drawingNameModel = createStateModel('')
export const ageRangeModel = createStateModel([2, 7])
