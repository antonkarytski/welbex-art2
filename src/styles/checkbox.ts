import { StyleSheet } from 'react-native'
import { createThemedStyle } from '../features/themed'
import { createThemedPreset } from '../features/themed/createThemedStyles'

export const checkboxThemedPreset = createThemedPreset((colors) => ({
  common: {
    border: colors.checkboxBorder,
    label: colors.text,
    background: colors.checkboxBackground,
    icon: colors.checkboxIcon,
  },
  checked: {
    border: colors.checkboxBackgroundActive,
    label: colors.text,
    background: colors.checkboxBackgroundActive,
    icon: colors.checkboxIcon,
  },
  invalid: {
    border: colors.errorBorder,
    label: colors.text,
    background: colors.checkboxBackground,
    icon: colors.checkboxIcon,
  },
}))
