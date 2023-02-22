import { useStore } from 'effector-react'
import React from 'react'
import { FlatListProps } from 'react-native'
import { SpecificCategoryResponse } from '../../api/parts/categories/types'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import DrawingsList from '../drawing/DrawingsList'
import CategoryDescription from './CategoryDescription'
import { categoryArtsRequest } from './request'

type CategoryGalleryProps = {
  item: SpecificCategoryResponse
  header?: React.ReactNode
  onScroll?: FlatListProps<any>['onScroll']
  onRefresh?: () => void
  refreshing?: boolean
}

const CategoryGallery = ({
  item,
  header,
  onScroll,
  ...props
}: CategoryGalleryProps) => {
  const text = useText()
  const gallery = useStore(categoryArtsRequest.$items)

  const getNextArts = () => {
    categoryArtsRequest.getNext({ id: item.id })
  }

  return (
    <>
      <DrawingsList
        onScroll={onScroll}
        ListHeader={
          <>
            {header}
            <>
              <CategoryDescription item={item} />
              <H2 label={text.participantsDrawings} />
            </>
          </>
        }
        data={gallery}
        onEndReached={getNextArts}
        {...props}
      />
    </>
  )
}

export default CategoryGallery
