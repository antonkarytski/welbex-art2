import { createSingleThemedStyle } from '../../features/themed'
import { themedShadow5Style } from '../../styles/shadows'

export const whiteCardThemedStyle = createSingleThemedStyle((colors) => ({
  ...themedShadow5Style(colors),
  borderRadius: 20,
  backgroundColor: colors.screenBackground,
}))
