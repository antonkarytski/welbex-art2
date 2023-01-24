import { StyleSheet } from 'react-native'
import { createThemedStyle } from '../features/themed'
import { InputStyles } from '../ui/input/types'

export const inputThemedStyles = createThemedStyle<InputStyles>((colors) =>
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

export const cellThemedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    cell: {
      borderColor: colors.inputBorder,
      backgroundColor: colors.inputBackground,
    },
    cell__focused: {
      borderColor: colors.inputFocusedBorder,
      backgroundColor: colors.inputFocusedBackground,
    },
  })
)
