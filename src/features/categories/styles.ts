import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { themedShadow5Style } from '../../styles/shadows'
import { createThemedStyle } from '../themed'

export type CategoryCardStyles = {
  container: ViewStyle
  captionContainer: ViewStyle
  label: TextStyle
}
export const categoryCardThemedStyles = createThemedStyle<CategoryCardStyles>(
  (colors) =>
    StyleSheet.create({
      container: {
        ...themedShadow5Style(colors),
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
