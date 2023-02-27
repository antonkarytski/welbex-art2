import { createThemedPreset } from '../features/themed/createThemedStyles'
import { PresetDropdownTabStates } from '../ui/dropdownTab/styles.preset'

export const dropdownTabThemedPreset =
  createThemedPreset<PresetDropdownTabStates>((colors) => ({
    common: {
      label: colors.textGrey,
      tabLabel: colors.text,
      icon: colors.text,
      tabBorder: colors.inputBorder,
      tabBackground: colors.inputBackground,
    },
    opened: {
      label: colors.textGrey,
      tabLabel: colors.text,
      icon: colors.textAccent,
      tabBorder: colors.inputFocusedBorder,
      tabBackground: colors.inputFocusedBackground,
    },
  }))
