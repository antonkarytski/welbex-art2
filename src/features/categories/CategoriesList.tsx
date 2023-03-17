import { useStore } from 'effector-react'
import React, { ReactElement, useCallback, useState } from 'react'
import { Animated, FlatListProps, StyleSheet } from 'react-native'
import { CategoryResponse } from '../../api/parts/categories/types'
import { SCREEN_PADDING_HORIZONTAL } from '../../styles/constants'
import { useText } from '../../translations/hook'
import Span from '../../ui/Span'
import Loader from '../../ui/loaders/Loader'
import CategoriesListSkeleton from '../../ui/loaders/Skeleton.CategoriesList'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import { winnersListModel } from '../winners/request'
import CardCategory from './Card.Category'
import { categoriesListModel } from './model'
import { categoryCardThemedStyles } from './styles'

type CategoriesListProps = {
  ListHeaderComponent?: () => ReactElement
  onScroll?: Animated.AnimatedProps<FlatListProps<any>>['onScroll']
}
const keyExtractor = ({ name }: CategoryResponse) => name

const CategoriesList = ({
  ListHeaderComponent,
  onScroll,
}: CategoriesListProps) => {
  const t = useText()
  const { styles } = useThemedStyleList({
    common: themedStyles,
    card: categoryCardThemedStyles,
  })

  const categories = useStore(categoriesListModel.$items)
  const isLoading = useStore(categoriesListModel.$isLoading)
  const isNextLoading = useStore(categoriesListModel.$isNextLoading)

  const [isRefreshing, setIsRefreshing] = useState(false)

  const onRefresh = () => {
    setIsRefreshing(true)
    Promise.all([winnersListModel.get, categoriesListModel.get]).finally(() =>
      setIsRefreshing(false)
    )
  }

  const getNextPageSync = () => {
    categoriesListModel.getNext()
  }

  const renderItem = useCallback(
    ({ item }: { item: CategoryResponse }) => {
      return <CardCategory item={item} styles={styles.card} />
    },
    [styles]
  )

  return (
    <Animated.FlatList
      style={styles.common.container}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
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
