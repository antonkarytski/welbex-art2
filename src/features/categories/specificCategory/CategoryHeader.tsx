import { useStore } from 'effector-react'
import React from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import { SpecificCategoryResponse } from '../../../api/parts/categories/types'
import { getMonthPeriodString } from '../../../lib/helpers/date'
import { languageModel } from '../../../translations/model.languages'
import H1 from '../../../ui/H1'
import Row from '../../../ui/Row'
import Span from '../../../ui/Span'
import CalendarIcon from '../../../ui/icons/Icon.Calendar'
import { createThemedStyle } from '../../themed'
import { useTheme } from '../../themed/hooks'

type CategoryDetailsHeaderProps = {
  onLayout?: ViewProps['onLayout']
  item: SpecificCategoryResponse
}

const CategoryHeader = ({ onLayout, item }: CategoryDetailsHeaderProps) => {
  const currentLanguage = useStore(languageModel.$state)
  const { styles, colors } = useTheme(themedStyles)

  if (!item) return null

  return (
    <View onLayout={onLayout} style={styles.content}>
      <H1 style={styles.title} label={item.name} />
      <Row style={styles.dateRow}>
        <CalendarIcon color={colors.whiteText} style={styles.calendarIcon} />
        <Span
          style={styles.term}
          label={getMonthPeriodString(
            item.competition.date_start,
            item.competition.date_end,
            currentLanguage
          )}
        />
      </Row>
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    content: {},
    title: {
      color: colors.whiteText,
      marginTop: 32,
      marginBottom: 16,
    },
    term: {
      fontSize: 16,
      color: colors.whiteText,
    },
    dateRow: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingBottom: 35,
    },
    calendarIcon: {
      marginRight: 15,
    },
  })
)

export default CategoryHeader
