import { createSingleThemedStyle } from '../features/themed'

export const themedShadow5Style = createSingleThemedStyle((colors) => {
  return {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
})
