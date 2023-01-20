import { ColorThemeStructure } from '../features/themed/theme'

export const switchThemedColors = (colors: ColorThemeStructure) => ({
  thumb: colors.switchThumbBackground,
  trackActive: colors.switchTrackBackgroundActive,
  track: colors.switchTrackBackground,
})
