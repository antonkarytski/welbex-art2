import { combine, sample } from 'effector'
import { createStateModel } from 'altek-toolkit'
import { ArtWorksFilterProps } from '../../../api/parts/arts/types'
import { CategoryResponse } from '../../../api/parts/categories/types'
import { noop } from '../../../lib/helpers'
import {
  dateObjectToString,
  toEndOfMonth,
  toNextMonth,
} from '../../../lib/helpers/date'
import { createCountriesListModel } from '../../countries/model.countriesDropdown'
import { AgeCategory } from '../../filters/ages'
import { $activeGallery } from '../model'
import { countFilteredGalleryModel, galleriesModeProp } from './request'

export const ignoreModeFilterModel = createStateModel(false)
export const categoriesFilterModel = createStateModel<CategoryResponse[]>([])
export const agesCategoriesFilterModel = createStateModel<AgeCategory[]>([])
export const countriesFilterModel = createCountriesListModel()
export const drawingNameFilterModel = createStateModel('')
export const onlyWinnersFilterModel = createStateModel(false)
export const minDateFilterModel = createStateModel<Date | null>(null)
export const maxDateFilterModel = createStateModel<Date | null>(null)

sample({
  source: maxDateFilterModel.$state,
  clock: minDateFilterModel.$state,
  fn: (max, min) => ({ max, min }),
}).watch(({ max, min }) => {
  if (!max || !min) return
  if (max < min) maxDateFilterModel.reset()
})

sample({
  source: minDateFilterModel.$state,
  clock: maxDateFilterModel.$state,
  fn: (min, max) => ({ max, min }),
}).watch(({ max, min }) => {
  if (!max || !min) return
  if (max < min) minDateFilterModel.reset()
})

export const resetGalleryFilter = () => {
  categoriesFilterModel.reset()
  countriesFilterModel.reset()
  drawingNameFilterModel.reset()
  agesCategoriesFilterModel.reset()
  onlyWinnersFilterModel.reset()
  minDateFilterModel.reset()
  maxDateFilterModel.reset()
  ignoreModeFilterModel.reset()
}

export const $galleryFilterProps = combine(
  {
    categories: categoriesFilterModel.$state,
    countries: countriesFilterModel.$state,
    drawingName: drawingNameFilterModel.$state,
    ageCategories: agesCategoriesFilterModel.$state,
    onlyWinners: onlyWinnersFilterModel.$state,
    minDate: minDateFilterModel.$state,
    maxDate: maxDateFilterModel.$state,
  },
  ({
    categories,
    countries,
    drawingName,
    ageCategories,
    onlyWinners,
    minDate,
    maxDate,
  }): ArtWorksFilterProps => {
    console.log(
      minDate ? dateObjectToString(minDate) : undefined,
      maxDate ? toEndOfMonth(maxDate) : undefined
    )
    return {
      category_ids: categories.map(({ id }) => id),
      countries: countries.map(({ alpha2Code }) => alpha2Code),
      title: drawingName,
      age_categories_ids: ageCategories.map(({ id }) => id),
      only_winners: onlyWinners,
      created_date_from: minDate ? dateObjectToString(minDate) : undefined,
      created_date_to: maxDate ? toEndOfMonth(maxDate) : undefined,
    }
  }
)

sample({
  clock: [$galleryFilterProps, $activeGallery],
  source: {
    filters: $galleryFilterProps,
    activeGallery: $activeGallery,
    ignoreMode: ignoreModeFilterModel.$state,
  },
}).watch(({ filters, activeGallery, ignoreMode }) => {
  const modeProps = ignoreMode ? {} : galleriesModeProp[activeGallery.type]
  countFilteredGalleryModel.get({ ...modeProps, ...filters }).catch(noop)
})
