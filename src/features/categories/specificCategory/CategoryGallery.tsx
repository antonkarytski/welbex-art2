import { useStore } from 'effector-react'
import { View } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SpecificCategoryResponse } from '../../../api/parts/categories/types'
import { SCREEN_PADDING_HORIZONTAL } from '../../../styles/constants'
import { useText } from '../../../translations/hook'
import Span from '../../../ui/Span'
import Loader from '../../../ui/loaders/Loader'
import DrawingsListSkeleton from '../../../ui/loaders/Skeleton.DrawingsList'
import ArtWorksList, {
  ArtWorksFlatListProps,
} from '../../artWork/artWorksList/ArtWorksList'
import { createThemedStyle } from '../../themed'
import { useThemedStyle } from '../../themed/hooks'
import CategoryGalleryHeader from './CategoryGalleryHeader'
import { categoryArtsModel } from './model'
import { getNextCategoryArts } from './request'

type CategoryGalleryProps = {
  item: SpecificCategoryResponse
  header?: React.ReactNode
} & Omit<ArtWorksFlatListProps, 'data'>

const CategoryGallery = ({ item, header, ...props }: CategoryGalleryProps) => {
  const text = useText()
  const styles = useThemedStyle(themedStyles)
  const drawings = useStore(categoryArtsModel.$items)
  const isNextLoading = useStore(categoryArtsModel.$isNextLoading)
  const isLoading = useStore(categoryArtsModel.$isLoading)

  const getNextArts = () => {
    getNextCategoryArts(item.id)
  }

  return (
    <ArtWorksList
      ListHeader={<CategoryGalleryHeader header={header} item={item} />}
      data={isLoading ? [] : drawings}
      onEndReached={getNextArts}
      ListFooterComponent={isNextLoading ? <Loader /> : null}
      ListEmptyComponent={
        <View style={styles.helperContainer}>
          {isLoading ? (
            <DrawingsListSkeleton />
          ) : (
            <Span
              label={text.noDrawingsInCategory}
              style={styles.noDrawingsLabel}
            />
          )}
        </View>
      }
      contentStyle={styles.listContentStyle}
      {...props}
    />
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    listContentStyle: {
      paddingTop: 0,
    },
    noDrawingsLabel: {
      color: colors.textGrey,
      fontSize: 18,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginVertical: 20,
      height: 400,
    },
    helperContainer: {
      paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
    },
  })
)

export default CategoryGallery
