import { createSingleThemedStyle } from '../features/themed'

export const errorTextThemedStyles = createSingleThemedStyle((colors) => {
  return {
    color: colors.errorText,
  }
})
