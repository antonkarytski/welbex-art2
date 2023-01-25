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
    container: {
      backgroundColor: colors.screenBackground,
    },
  })
)

export const themedCommonStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: colors.screenBackground,
    },
    text: {
      color: colors.text,
    },
    textAccent: {
      color: colors.textAccent,
    },
    title: {
      color: colors.text,
      textAlign: 'center',
    },
    describedTitle: {
      marginBottom: 8,
    },
    titleDescription: {
      color: colors.textGrey,
      textAlign: 'center',
      fontSize: 14,
      marginBottom: 40,
    },
    bottomButton: {
      marginTop: 'auto',
    },
    flexGrown: {
      flexGrow: 1,
    },
  })
)
