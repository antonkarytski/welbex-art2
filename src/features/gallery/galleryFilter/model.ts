import { combine, sample } from 'effector'
import { createStateModel } from 'altek-toolkit'
import { ArtWorksFilterProps } from '../../../api/parts/arts/types'
import { CategoryResponse } from '../../../api/parts/categories/types'
import { noop } from '../../../lib/helpers'
import { createCountriesListModel } from '../../countries/model.countriesDropdown'
import { AgeCategory } from '../../filters/ages'
import { $activeGallery } from '../model'
import { countFilteredGalleryModel, galleriesModeProp } from './request'

export const categoriesFilterModel = createStateModel<CategoryResponse[]>([])
export const agesCategoriesFilterModel = createStateModel<AgeCategory[]>([])
export const countriesFilterModel = createCountriesListModel()
export const drawingNameFilterModel = createStateModel('')
export const onlyWinnersFilterModel = createStateModel(false)

export const resetGalleryFilter = () => {
  categoriesFilterModel.reset()
  countriesFilterModel.reset()
  drawingNameFilterModel.reset()
  agesCategoriesFilterModel.reset()
  onlyWinnersFilterModel.reset()
}

export const $galleryFilterProps = combine(
  {
    categories: categoriesFilterModel.$state,
    countries: countriesFilterModel.$state,
    drawingName: drawingNameFilterModel.$state,
    ageCategories: agesCategoriesFilterModel.$state,
    onlyWinners: onlyWinnersFilterModel.$state,
  },
  ({
    categories,
    countries,
    drawingName,
    ageCategories,
    onlyWinners,
  }): ArtWorksFilterProps => {
    return {
      category_ids: categories.map(({ id }) => id),
      countries: countries.map(({ alpha2Code }) => alpha2Code),
      title: drawingName,
      age_categories_ids: ageCategories.map(({ id }) => id),
      only_winners: onlyWinners,
    }
  }
)

sample({
  clock: [$galleryFilterProps, $activeGallery],
  source: { filters: $galleryFilterProps, activeGallery: $activeGallery },
}).watch(({ filters, activeGallery }) => {
  countFilteredGalleryModel
    .get({
      ...galleriesModeProp[activeGallery.type],
      ...filters,
    })
    .catch(noop)
})
