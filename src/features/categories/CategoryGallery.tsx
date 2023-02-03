import React from 'react'
import { FlatListProps, ImageBackground, StyleSheet, View } from 'react-native'
import { useText } from '../../translations/hook'
import H1 from '../../ui/H1'
import H2 from '../../ui/H2'
import Span from '../../ui/Span'
import DrawingsList from '../drawing/DrawingsList'
import { createThemedStyle } from '../themed'
import { useTheme, useThemedStyleList } from '../themed/hooks'
import CategoryDescription from './CategoryDescription'
import { useCategoryGallery } from './model/hooks'
import { CompetitionCategory } from './types'

type CategoryGalleryProps = {
  item: CompetitionCategory
  header?: React.ReactNode
  onScroll?: FlatListProps<any>['onScroll']
}

const CategoryGallery = ({ item, header, onScroll }: CategoryGalleryProps) => {
  const text = useText()
  const gallery = useCategoryGallery(item.name)
  const { styles } = useThemedStyleList({
    common: themedStyles,
  })

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
      />
    </>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    content: {
      backgroundColor: 'red',
    },
    title: {
      color: colors.whiteText,
      marginBottom: 12,
    },
    term: {
      color: colors.whiteText,
      marginBottom: 36,
    },
  })
)

export default CategoryGallery
