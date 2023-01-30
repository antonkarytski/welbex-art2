import { defaultColors } from '../../features/themed/theme'
import { PresetCheckboxStates } from './types'

export const defaultCheckboxPreset: PresetCheckboxStates = {
  common: {
    checkboxBorder: defaultColors.checkboxBorder,
    checkboxBackground: defaultColors.checkboxBackground,
    label: defaultColors.text,
    icon: defaultColors.whiteText,
  },
  selected: {
    checkboxBorder: defaultColors.checkboxBackgroundActive,
    checkboxBackground: defaultColors.checkboxBackgroundActive,
    label: defaultColors.text,
    icon: defaultColors.whiteText,
  },
  invalid: {
    checkboxBorder: defaultColors.errorBorder,
    label: defaultColors.text,
    icon: defaultColors.whiteText,
  },
}
