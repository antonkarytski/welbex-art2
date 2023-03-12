import { useStore } from 'effector-react'
import { View } from 'native-base'
import React from 'react'
import { FlatListProps, StyleSheet } from 'react-native'
import { SpecificCategoryResponse } from '../../../api/parts/categories/types'
import { SCREEN_PADDING_HORIZONTAL } from '../../../styles/constants'
import { useText } from '../../../translations/hook'
import Span from '../../../ui/Span'
import Loader from '../../../ui/loaders/Loader'
import DrawingsList from '../../drawing/DrawingsList'
import { createThemedStyle } from '../../themed'
import { useThemedStyle } from '../../themed/hooks'
import { categoryArtsModel } from '../request'
import CategoryGalleryHeader from './CategoryGalleryHeader'

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
  const styles = useThemedStyle(themedStyles)
  const drawings = useStore(categoryArtsModel.$items)
  const isNextLoading = useStore(categoryArtsModel.$isNextLoading)

  const getNextArts = () => {
    categoryArtsModel.getNext({
      category_id: item.id,
      active_competition: true,
    })
  }

  return (
    <>
      <DrawingsList
        onScroll={onScroll}
        ListHeader={<CategoryGalleryHeader header={header} item={item} />}
        data={drawings}
        onEndReached={getNextArts}
        ListFooterComponent={isNextLoading ? <Loader /> : null}
        ListEmptyComponent={
          <View style={styles.noDrawingsContainer}>
            <CategoryGalleryHeader header={header} item={item} />
            <Span
              label={text.noDrawingsInCategory}
              style={styles.noDrawingsLabel}
            />
          </View>
        }
        {...props}
      />
    </>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    noDrawingsLabel: {
      color: colors.textGrey,
      fontSize: 18,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginVertical: 20,
      height: 400,
    },
    noDrawingsContainer: {
      paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
    },
  })
)

export default CategoryGallery
