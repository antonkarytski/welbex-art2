import { createThemedPreset } from '../features/themed/createThemedStyles'
import { GradientColors, MotionGradientColors } from '../ui/gradients/types'

export const themedPrimaryGradient = createThemedPreset<GradientColors>(
  (colors) => ({
    start: colors.primaryGradientDark,
    end: colors.primaryGradientLight,
  })
)

export const themedPrimaryMotionGradient =
  createThemedPreset<MotionGradientColors>((colors, theme) => ({
    ...themedPrimaryGradient(theme),
    overlay: colors.screenBackground,
  }))
