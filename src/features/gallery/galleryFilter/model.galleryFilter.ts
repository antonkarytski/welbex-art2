import { createStateModel } from 'altek-toolkit'
import { MOCK_CATEGORIES } from '../../../_mock/categories'
import {
  createCountryModel,
  createSearchCountryModel,
} from '../../countries/model.countriesDropdown'

export const categoryModel = createStateModel(MOCK_CATEGORIES[0])
export const countryModel = createCountryModel()
export const countrySearchModel = createSearchCountryModel()

export const drawingNameModel = createStateModel('')
export const ageRangeModel = createStateModel([2, 7])
