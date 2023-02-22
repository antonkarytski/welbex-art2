import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SpecificCategoryResponse } from '../../api/parts/categories/types'
import { useText } from '../../translations/hook'
import H3 from '../../ui/H3'
import Span from '../../ui/Span'
import { createThemedStyle } from '../themed'
import { useThemedStyle } from '../themed/hooks'

type CategoryDescriptionProps = {
  item: SpecificCategoryResponse
}

const CategoryDescription = ({ item }: CategoryDescriptionProps) => {
  const text = useText()
  const styles = useThemedStyle(themedStyles)

  return (
    <View style={styles.container}>
      <H3 style={styles.header} label={text.description} />
      <Span style={styles.text} label={item.description} />
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      marginBottom: 8,
      marginTop: 24,
    },
    header: {
      marginTop: 0,
      color: colors.text,
    },
    text: {
      color: colors.text,
      lineHeight: 21.28,
    },
  })
)

export default CategoryDescription
