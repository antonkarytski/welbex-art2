import { StyleSheet } from 'react-native'
import { createThemedStyle } from '../../../features/themed'

export const themedScreenHeaderStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    title: {
      color: colors.appHeaderTextDark,
    },
    line: {
      backgroundColor: colors.appHeaderBorderDark,
    },
  })
)

export const themedCommonStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    screenWrapper: {
      backgroundColor: colors.screenBackground,
    },
    text: {
      color: colors.text,
    },
    textAccent: {
      color: colors.textAccent,
    },
  })
)
