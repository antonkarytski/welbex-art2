import { ColorThemeStructure } from '../features/themed/theme'
import { SwitcherColors } from '../ui/Switch'

export const getSwitcherThemedColors = (
  colors: ColorThemeStructure
): SwitcherColors => ({
  thumb: colors.switchThumbBackground,
  trackActive: colors.switchTrackBackgroundActive,
  track: colors.switchTrackBackground,
})
