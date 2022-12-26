import { StyleSheet } from 'react-native'
import { createThemedStyle } from '../features/themed'

export const inputThemedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    wrapper: {
      marginBottom: 12,
    },
    input: {
      borderColor: colors.inputBorder,
      backgroundColor: colors.inputBackground,
    },
    input__focused: {
      borderColor: colors.inputFocusedBorder,
      backgroundColor: colors.inputFocusedBackground,
    },
    label: {
      color: colors.inputTitle,
    },
  })
)
