import { StyleSheet } from 'react-native'
import { createThemedStyle } from '../themed'
import { createThemedPreset } from '../themed/createThemedStyles'

export const featureStyles = StyleSheet.create({
  formTitle: {
    textAlign: 'center',
  },
})

export const themedButtonPreset = createThemedPreset((colors) => ({
  common: {
    background: colors.buttonBackground,
    label: colors.buttonText,
    border: colors.buttonBackground,
  },
  active: {
    background: colors.buttonBackgroundPressed,
    label: colors.buttonText,
    border: colors.buttonBorderPressed,
  },
  disabled: {
    background: colors.buttonBackgroundDisabled,
    label: colors.buttonTextDisabled,
    border: colors.buttonBorderDisabled,
  },
}))

export const themedFieldStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    wrapper: {
      marginBottom: 12,
    },
    input: {
      borderColor: colors.inputBorder,
      backgroundColor: colors.inputBackground,
    },
    input__focused: {
      backgroundColor: colors.inputFocusedBackground,
      borderColor: colors.inputFocusedBorder,
    },
  })
)
