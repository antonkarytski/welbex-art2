import { useStore } from 'effector-react'
import React from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import { getMonthPeriodString } from '../../../lib/helpers/date'
import { languageModel } from '../../../translations/model.languages'
import H1 from '../../../ui/H1'
import Span from '../../../ui/Span'
import { createThemedStyle } from '../../themed'
import { useThemedStyle } from '../../themed/hooks'
import { categoryDetailsModel } from '../request'

type CategoryDetailsHeaderProps = {
  onLayout?: ViewProps['onLayout']
}

const CategoryHeader = ({ onLayout }: CategoryDetailsHeaderProps) => {
  const category = useStore(categoryDetailsModel.$data)
  const currentLanguage = useStore(languageModel.$state)
  const styles = useThemedStyle(themedStyles)

  if (!category) return null

  return (
    <View onLayout={onLayout} style={styles.content}>
      <H1 style={styles.title} label={category.name} />
      <Span
        style={styles.term}
        label={getMonthPeriodString(
          category.competition.date_start,
          category.competition.date_end,
          currentLanguage.toLowerCase()
        )}
      />
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    content: {
      paddingHorizontal: 20,
    },
    title: {
      color: colors.whiteText,
      marginBottom: 12,
    },
    term: {
      color: colors.whiteText,
      marginBottom: 36,
    },
  })
)

export default CategoryHeader
