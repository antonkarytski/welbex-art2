import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { createThemedStyle } from '../../features/themed'

export type ScreenHeaderStyles = {
  container?: ViewStyle
  line?: ViewStyle
  title?: TextStyle
}

export const primaryHeaderThemedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.primary1,
    },
    line: {
      marginBottom: 32,
    },
  })
)
