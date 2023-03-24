import { useStore } from 'effector-react'
import React from 'react'
import { useText } from '../../../translations/hook'
import Span from '../../../ui/Span'
import GalleryListBase from '../GalleryListBase'
import { $activeGallery } from '../model'
import { $galleryFilterProps } from './model'

const FilteredGalleryList = () => {
  const text = useText()
  const { type } = useStore($activeGallery)
  const filters = useStore($galleryFilterProps)

  return (
    <GalleryListBase
      type={type}
      filters={filters}
      getListOnMount={false}
      ListEmptyComponent={
        //TODO: Component when design will ready
        <Span label={text.noResultsBySearch} />
      }
    />
  )
}

export default FilteredGalleryList
