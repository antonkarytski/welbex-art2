import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useText } from '../../translations/hook'
import H3 from '../../ui/H3'
import Span from '../../ui/Span'
import { createThemedStyle } from '../themed'
import { useThemedStyle } from '../themed/hooks'
import { CompetitionCategory } from './types'

type CategoryDescriptionProps = {
  item: CompetitionCategory
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
      marginTop: 12,
      marginBottom: 8,
    },
    header: {
      color: colors.text,
    },
    text: {
      color: colors.text,
      lineHeight: 21.28,
    },
  })
)

export default CategoryDescription
