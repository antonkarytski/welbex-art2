import { ColorThemeStructure } from '../../features/themed/theme'

export const primaryGradientPreset = (colors: ColorThemeStructure) => {
  return {
    start: colors.primaryGradientDark,
    end: colors.primaryGradientLight,
  }
}
