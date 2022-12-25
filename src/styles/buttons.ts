import { StyleSheet } from 'react-native'
import { createThemedStyle } from '../features/themed'
import { createThemedPreset } from '../features/themed/createThemedStyles'

export const buttonPrimaryThemedPreset = createThemedPreset((colors) => ({
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

export const buttonLightThemedPreset = createThemedPreset((colors) => ({
  common: {
    background: colors.buttonLightBackground,
    label: colors.buttonLightText,
    border: colors.buttonLightBorder,
  },
  active: {
    background: colors.buttonLightBackgroundPressed,
    label: colors.buttonLightTextPressed,
    border: colors.buttonLightBorderPressed,
  },
  disabled: {
    background: colors.buttonLightBackgroundDisabled,
    label: colors.buttonLightTextDisabled,
    border: colors.buttonLightBorderDisabled,
  },
}))

export const buttonTextThemedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    label: {
      color: colors.textAccent,
    },
  })
)
