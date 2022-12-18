import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { createSingleThemedStyle, createThemedStyle } from '../themed'

export type WinnerCardStyles = {
  description: ViewStyle
  row: ViewStyle
  categoryLabel: TextStyle
  yearsLabel: TextStyle
  name: TextStyle
  container: ViewStyle
}

export type CategoryCardStyles = {
  container: ViewStyle
  captionContainer: ViewStyle
  label: TextStyle
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

export const categoryCardThemedStyles = createThemedStyle<CategoryCardStyles>(
  (colors) =>
    StyleSheet.create({
      container: {
        shadowColor: '#1F1F1F1F',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 20,
      },
      captionContainer: {
        backgroundColor: colors.card,
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
      },
      label: {
        fontSize: 16,
        color: colors.text,
      },
    })
)
