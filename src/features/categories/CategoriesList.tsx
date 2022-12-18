import React, { useCallback } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { MOCK_CATEGORIES } from '../../_mock/categories'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import CardCategory from './Card.Category'
import { categoryCardThemedStyles } from './styles'
import { CompetitionCategory } from './types'

type CategoriesListProps = {}
const keyExtractor = ({ name }: CompetitionCategory) => name

const CategoriesList = ({}: CategoriesListProps) => {
  const text = useText()
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
    <View style={styles.common.container}>
      <H2 style={styles.common.title} label={text.categories} />
      <FlatList
        contentContainerStyle={styles.common.listContent}
        data={MOCK_CATEGORIES}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
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
    listContent: {
      paddingHorizontal: 20,
    },
  })
)

export default CategoriesList
