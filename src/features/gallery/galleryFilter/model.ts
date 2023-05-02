import { combine, sample } from 'effector'
import { createStateModel } from 'altek-toolkit'
import { ArtWorksFilterProps } from '../../../api/parts/arts/types'
import { CategoryResponse } from '../../../api/parts/categories/types'
import { noop } from '../../../lib/helpers'
import { createCountriesListModel } from '../../countries/model.countriesDropdown'
import { AgeCategory } from '../../filters/ages'
import { $activeGallery } from '../model'
import { countFilteredGalleryModel, galleriesModeProp } from './request'

export const categoriesModel = createStateModel<CategoryResponse[]>([])
export const agesCategoriesModel = createStateModel<AgeCategory[]>([])
export const countriesModel = createCountriesListModel()
export const drawingNameModel = createStateModel('')

export const resetGalleryFilter = () => {
  categoriesModel.reset()
  countriesModel.reset()
  drawingNameModel.reset()
  agesCategoriesModel.reset()
}

export const $galleryFilterProps = combine(
  {
    categories: categoriesModel.$state,
    countries: countriesModel.$state,
    drawingName: drawingNameModel.$state,
    ageCategories: agesCategoriesModel.$state,
  },
  ({
    categories,
    countries,
    drawingName,
    ageCategories,
  }): ArtWorksFilterProps => {
    return {
      category_ids: categories.map(({ id }) => id),
      countries: countries.map(({ alpha2Code }) => alpha2Code),
      title: drawingName,
      age_categories_ids: ageCategories.map(({ id }) => id),
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
