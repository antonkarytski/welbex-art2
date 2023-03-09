import React from 'react'
import { SpecificCategoryResponse } from '../../../api/parts/categories/types'
import { useText } from '../../../translations/hook'
import H2 from '../../../ui/H2'
import CategoryDescription from './CategoryDescription'

type CategoryGalleryProps = {
  item: SpecificCategoryResponse
  header?: React.ReactNode
}

const CategoryGalleryHeader = ({ header, item }: CategoryGalleryProps) => {
  const text = useText()

  return (
    <>
      {header}
      <CategoryDescription item={item} />
      <H2 label={text.participantsDrawings} />
    </>
  )
}

export default CategoryGalleryHeader
