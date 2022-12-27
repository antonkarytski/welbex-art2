import { StyleSheet } from 'react-native'
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

export const themedShadow3Style = createSingleThemedStyle((colors) => {
  return {
    shadowColor: colors.selectShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  }
})

export const shadow3Style = () => {
  return {
    shadowColor: '#000000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 5,
    elevation: 5,
  }
}

// box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.16);

// shadowOffset: { height: 3, width: 3 },
// shadowColor: '#000000',
// shadowOpacity: 0.5,
// shadowRadius: 5
