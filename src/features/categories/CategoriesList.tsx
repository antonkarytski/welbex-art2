import React, { useCallback } from 'react'
import { Animated, FlatListProps, StyleSheet } from 'react-native'
import { MOCK_CATEGORIES } from '../../_mock/categories'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import CardCategory from './Card.Category'
import { categoryCardThemedStyles } from './styles'
import { CompetitionCategory } from './types'

type CategoriesListProps = {
  ListHeaderComponent?: FlatListProps<any>['ListHeaderComponent']
  onScroll?: Animated.AnimatedProps<FlatListProps<any>>['onScroll']
}
const keyExtractor = ({ name }: CompetitionCategory) => name

const CategoriesList = ({
  ListHeaderComponent,
  onScroll,
}: CategoriesListProps) => {
  const { styles } = useThemedStyleList({
    common: themedStyles,
    card: categoryCardThemedStyles,
  })

  const renderItem = useCallback(
    ({ item }: { item: CompetitionCategory }) => {
      return <CardCategory item={item} styles={styles.card} />
    },
    [styles]
  )

  return (
    <Animated.FlatList
      style={styles.common.container}
      bounces={false}
      onScroll={onScroll}
      ListHeaderComponent={ListHeaderComponent}
      showsVerticalScrollIndicator={false}
      data={MOCK_CATEGORIES}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
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
