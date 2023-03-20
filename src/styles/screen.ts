import { StyleSheet } from 'react-native'
import { createThemedStyle } from '../features/themed'

export const lightScreenThemedBackground = createThemedStyle((colors) =>
  StyleSheet.create({
    background: {
      backgroundColor: colors.screenBackground,
    },
  })
)

export const screenHeaderThemedStylesDark = createThemedStyle((colors) =>
  StyleSheet.create({
    title: {
      color: colors.appHeaderTextDark,
    },
    line: {
      backgroundColor: colors.appHeaderBorderDark,
    },
  })
)

export const screenHeaderThemedStylesLight = createThemedStyle((colors) =>
  StyleSheet.create({
    title: {
      color: colors.appHeaderTextLight,
    },
    line: {
      backgroundColor: colors.appHeaderBorderLight,
    },
    container: {
      backgroundColor: colors.screenBackgroundAccent,
    },
  })
)

export const screenHeaderThemedStylesTransparent = createThemedStyle((colors) =>
  StyleSheet.create({
    title: {
      color: colors.whiteText,
    },
    line: {
      backgroundColor: colors.whiteText,
    },
    container: {
      backgroundColor: 'transparent',
    },
  })
)
