import { useStore } from 'effector-react'
import React, { useCallback, useState } from 'react'
import { Animated, FlatListProps, StyleSheet } from 'react-native'
import { CategoryResponse } from '../../api/parts/categories/types'
import { SCREEN_PADDING_HORIZONTAL } from '../../styles/constants'
import { useText } from '../../translations/hook'
import Loader from '../../ui/Loader'
import Span from '../../ui/Span'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import { winnersRequest } from '../winners/request'
import CardCategory from './Card.Category'
import { categoriesListModel } from './request'
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
  const t = useText()
  const { styles } = useThemedStyleList({
    common: themedStyles,
    card: categoryCardThemedStyles,
  })

  const categories = useStore(categoriesListModel.$items)
  const isLoading = useStore(categoriesListModel.$isLoading) // TODO: add loader

  const nextPage = useStore(categoriesListModel.$nextPage)

  const [isRefreshing, setIsRefreshing] = useState(false)

  const onRefresh = () => {
    setIsRefreshing(true)
    Promise.all([winnersRequest.get, categoriesListModel.get]).finally(() =>
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
      ListFooterComponent={nextPage ? <Loader /> : null}
      onEndReached={getNextPageSync}
      ListEmptyComponent={
        <>
          {ListHeaderComponent && <ListHeaderComponent />}
          <Span label={t.noCategories} style={styles.common.noItemsNote} />
        </>
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
