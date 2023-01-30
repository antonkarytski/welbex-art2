import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { createThemedStyle } from '../../features/themed'

export type ScreenHeaderStyles = {
  container?: ViewStyle
  line?: ViewStyle
  title?: TextStyle
}

export const transparentThemedHeaderStyles =
  createThemedStyle<ScreenHeaderStyles>((colors) =>
    StyleSheet.create({
      title: {
        color: colors.text,
      },
      line: {
        backgroundColor: colors.darkLine,
      },
    })
  )
