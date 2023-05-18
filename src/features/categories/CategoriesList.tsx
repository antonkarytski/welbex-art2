import { useStore } from 'effector-react'
import React, { ReactElement, useCallback, useState } from 'react'
import {
  Animated,
  FlatListProps,
  ListRenderItemInfo,
  StyleSheet,
} from 'react-native'
import { CategoryResponse } from '../../api/parts/categories/types'
import { createAdsBanner } from '../../lib/ads/AdsBanner'
import { createFreqFilter } from '../../lib/ads/helpers'
import { useIsAdsVisible } from '../../lib/ads/hooks'
import { AdsName } from '../../lib/ads/list'
import { SCREEN_PADDING_HORIZONTAL } from '../../styles/constants'
import { useText } from '../../translations/hook'
import Span from '../../ui/Span'
import Loader from '../../ui/loaders/Loader'
import CategoriesListSkeleton from '../../ui/loaders/Skeleton.CategoriesList'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import CardCategory from './Card.Category'
import { categoriesListModel } from './model'
import { categoryCardThemedStyles } from './styles'

type CategoriesListProps = {
  ListHeaderComponent?: () => ReactElement
  onScroll?: Animated.AnimatedProps<FlatListProps<any>>['onScroll']
}
const keyExtractor = ({ name }: CategoryResponse) => name

const adsBannerFreq = createFreqFilter(4)
const AdsBanner = createAdsBanner(AdsName.CATEGORIES, {
  style: { marginBottom: 20 },
  requestOptions: {
    requestNonPersonalizedAdsOnly: true,
  },
})

const CategoriesList = ({
  ListHeaderComponent,
  onScroll,
}: CategoriesListProps) => {
  const t = useText()
  const { styles } = useThemedStyleList({
    common: themedStyles,
    card: categoryCardThemedStyles,
  })

  const isAdsVisible = useIsAdsVisible()
  const categories = useStore(categoriesListModel.$items)
  const isLoading = useStore(categoriesListModel.$isLoading)
  const isNextLoading = useStore(categoriesListModel.$isNextLoading)

  const getNextPageSync = () => {
    categoriesListModel.getNext()
  }

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<CategoryResponse>) => {
      return (
        <>
          {isAdsVisible && adsBannerFreq(index) && <AdsBanner />}
          <CardCategory item={item} styles={styles.card} />
        </>
      )
    },
    [styles, isAdsVisible]
  )

  return (
    <Animated.FlatList
      bounces={false}
      style={styles.common.container}
      onScroll={onScroll}
      ListHeaderComponent={ListHeaderComponent}
      showsVerticalScrollIndicator={false}
      data={categories}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListFooterComponent={isNextLoading ? <Loader /> : null}
      onEndReached={isNextLoading ? undefined : getNextPageSync}
      ListEmptyComponent={
        isLoading ? (
          <CategoriesListSkeleton />
        ) : (
          <Span label={t.noCategories} style={styles.common.noItemsNote} />
        )
      }
    />
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      paddingLeft: 20,
    },
    noItemsNote: {
      color: colors.textGrey,
      fontSize: 18,
      paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  })
)

export default CategoriesList
