import { combine, createEffect, sample } from 'effector'
import { createStateModel } from 'altek-toolkit'
import { ArtWorksFilterProps } from '../../../api/parts/arts/types'
import { CategoryResponse } from '../../../api/parts/categories/types'
import { CATEGORIES_AGE_RANGE } from '../../../constants/categories'
import { noop } from '../../../lib/helpers'
import { createCountriesListModel } from '../../countries/model.countriesDropdown'
import { $activeGallery } from '../model'
import { GalleyDescriptor } from '../types'
import { countFilteredGalleryModel, galleriesModeProp } from './request'

export const categoriesModel = createStateModel<CategoryResponse[]>([])
export const countriesModel = createCountriesListModel()
export const drawingNameModel = createStateModel('')
export const ageRangeModel = createStateModel(CATEGORIES_AGE_RANGE)

export const resetGalleryFilter = () => {
  categoriesModel.set([])
  countriesModel.reset()
  drawingNameModel.set('')
  ageRangeModel.set(CATEGORIES_AGE_RANGE)
}

export const $galleryFilterProps = combine(
  {
    categories: categoriesModel.$state,
    countries: countriesModel.$state,
    drawingName: drawingNameModel.$state,
    ageRange: ageRangeModel.$state,
  },
  ({ categories, countries, drawingName, ageRange }): ArtWorksFilterProps => {
    return {
      category_ids: categories.map(({ id }) => id),
      countries: countries.map(({ alpha2Code }) => alpha2Code),
      title: drawingName,
      min_age: ageRange[0],
      max_age: ageRange[1],
    }
  }
)

sample({
  clock: [$galleryFilterProps, $activeGallery],
  source: { filters: $galleryFilterProps, activeGallery: $activeGallery },
  target: createEffect(
    ({
      filters,
      activeGallery,
    }: {
      filters: ArtWorksFilterProps
      activeGallery: GalleyDescriptor
    }) => {
      countFilteredGalleryModel
        .get({
          ...galleriesModeProp[activeGallery.type],
          ...filters,
        })
        .catch(noop)
    }
  ),
})
