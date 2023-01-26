import { StyleSheet } from 'react-native'
import { createThemedStyle } from '../../../features/themed'

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
