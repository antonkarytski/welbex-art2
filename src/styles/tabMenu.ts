import { StyleSheet } from 'react-native'
import { createThemedStyle } from '../features/themed'

export const tabMenuThemedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    label: {
      color: colors.textLightGrey,
    },
    labelActive: {
      color: colors.text,
    },
    line: {
      backgroundColor: colors.tabsLine,
    },
    lineActive: {
      backgroundColor: colors.tabsSelectedTint,
    },
    container: {
      backgroundColor: colors.screenBackground,
    },
  })
)
