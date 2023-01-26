import { StyleSheet } from 'react-native'
import { createThemedStyle } from '../../../features/themed'

export const themedScreenHeaderStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    title: {
      color: colors.appHeaderTextDark,
      fontSize: 18,
      fontWeight: '600',
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
    bottomButton: {
      marginTop: 'auto',
    },
    flexGrown: {
      flexGrow: 1,
    },
  })
)
