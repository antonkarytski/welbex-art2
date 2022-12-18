import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
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
