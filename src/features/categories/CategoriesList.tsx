import { useStore } from 'effector-react'
import React, { useCallback, useState } from 'react'
import { Animated, FlatListProps, StyleSheet } from 'react-native'
import { CategoryResponse } from '../../api/parts/categories/types'
import Loader from '../../ui/Loader'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import { winnersRequest } from '../winners/request'
import CardCategory from './Card.Category'
import { categoriesRequest } from './request'
import { categoryCardThemedStyles } from './styles'

type CategoriesListProps = {
  ListHeaderComponent?: FlatListProps<any>['ListHeaderComponent']
  onScroll?: Animated.AnimatedProps<FlatListProps<any>>['onScroll']
}
const keyExtractor = ({ name }: CategoryResponse) => name

const CategoriesList = ({
  ListHeaderComponent,
  onScroll,
}: CategoriesListProps) => {
  const { styles } = useThemedStyleList({
    common: themedStyles,
    card: categoryCardThemedStyles,
  })

  const categories = useStore(categoriesRequest.$items)
  const nextPage = useStore(categoriesRequest.$nextPage)

  const [isRefreshing, setIsRefreshing] = useState(false)

  const onRefresh = () => {
    setIsRefreshing(true)
    Promise.all([winnersRequest.get, categoriesRequest.get]).finally(() =>
      setIsRefreshing(false)
    )
  }

  const getNextPageSync = () => {
    categoriesRequest.getNext()
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
      ListFooterComponent={nextPage ? <Loader /> : null}
      onEndReached={getNextPageSync}
    />
  )
}

const themedStyles = createThemedStyle(() =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      paddingLeft: 20,
    },
  })
)

export default CategoriesList
