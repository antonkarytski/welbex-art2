import { StyleSheet } from 'react-native'
import { createThemedStyle } from '../themed'
import { createThemedPreset } from '../themed/createThemedStyles'

export const featureStyles = StyleSheet.create({
  formTitle: {
    textAlign: 'center',
  },
})

export const themedTextButtonStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    button: {
      marginVertical: 10,
      marginLeft: 'auto',
    },
    label: {
      color: colors.textAccent,
    },
  })
)

export const inputThemedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    wrapper: {
      marginBottom: 12,
    },
    input: {
      borderColor: colors.inputBorder,
      backgroundColor: colors.inputBackground,
    },
  })
)

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
