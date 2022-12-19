import React from 'react'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import DrawingsList from '../drawing/DrawingsList'
import CategoryDescription from './CategoryDescription'
import { useCategoryGallery } from './model/hooks'
import { CompetitionCategory } from './types'

type CategoryGalleryProps = {
  item: CompetitionCategory
}

const CategoryGallery = ({ item }: CategoryGalleryProps) => {
  const text = useText()
  const gallery = useCategoryGallery(item.name)

  return (
    <DrawingsList
      ListHeader={
        <>
          <CategoryDescription item={item} />
          <H2 label={text.participantsDrawings} />
        </>
      }
      data={gallery}
    />
  )
}

export default CategoryGallery
