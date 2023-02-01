import { StyleSheet } from 'react-native'
import { createThemedStyle } from '../features/themed'

export const lightScreenThemedBackground = createThemedStyle((colors) =>
  StyleSheet.create({
    background: {
      backgroundColor: colors.screenBackground,
    },
  })
)

export const transparentScreenHeaderThemedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    title: {
      color: colors.appHeaderTextDark,
    },
    line: {
      backgroundColor: colors.appHeaderBorderDark,
    },
    container: {
      backgroundColor: colors.screenBackground,
    },
  })
)

export const coloredScreenHeaderThemedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    title: {
      color: colors.appHeaderTextLight,
      fontSize: 18,
    },
    line: {
      backgroundColor: colors.appHeaderBorderLight,
    },
    container: {
      backgroundColor: colors.screenBackgroundAccent,
    },
  })
)
