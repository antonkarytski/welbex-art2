import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { createThemedStyle } from '../themed'

export type WinnerCardStyles = {
  description: ViewStyle
  row: ViewStyle
  categoryLabel: TextStyle
  yearsLabel: TextStyle
  name: TextStyle
  container: ViewStyle
}

export const winnerCardThemedStyles = createThemedStyle<WinnerCardStyles>(
  (colors) =>
    StyleSheet.create({
      container: {
        marginLeft: 20,
        width: 235,
      },
      description: {
        backgroundColor: colors.card,
        paddingHorizontal: 20,
        paddingTop: 16.5,
        paddingBottom: 20,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
      },
      row: {
        flexDirection: 'row',
      },
      categoryLabel: {
        color: colors.text,
      },
      yearsLabel: {
        marginLeft: 8,
        color: colors.subText,
      },
      name: {
        marginTop: 7.5,
        color: colors.text,
      },
    })
)
