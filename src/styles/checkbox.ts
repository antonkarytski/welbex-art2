import { createThemedPreset } from '../features/themed/createThemedStyles'
import { PresetCheckboxStates } from '../ui/checkbox/types'

export const checkboxThemedPreset = createThemedPreset<PresetCheckboxStates>(
  (colors) => ({
    common: {
      checkboxBorder: colors.checkboxBorder,
      checkboxBackground: colors.checkboxBackground,
      label: colors.text,
      icon: colors.checkboxIcon,
    },
    selected: {
      checkboxBorder: colors.checkboxBackgroundActive,
      checkboxBackground: colors.checkboxBackgroundActive,
      label: colors.text,
      icon: colors.checkboxIcon,
    },
    invalid: {
      checkboxBorder: colors.errorBorder,
      checkboxBackground: colors.checkboxBackground,
      label: colors.text,
      icon: colors.checkboxIcon,
    },
  })
)
