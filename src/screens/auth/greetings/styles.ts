import { StyleSheet } from 'react-native'
import { createThemedStyle } from '../../../features/themed'

export const themedGreetingsStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    caption: {
      color: colors.text,
      fontSize: 18,
      textAlign: 'center',
    },
    text: {
      color: colors.text,
      fontSize: 14,
      textAlign: 'center',
    },
    subCaptionText: {
      marginTop: 24,
    },
    button: {
      marginTop: 'auto',
    },
    img: {
      width: '100%',
    },
    imgWrp: {
      borderRadius: 10,
      overflow: 'hidden',
      marginTop: 13,
      marginBottom: 60,
    },
    paginationDot: {
      backgroundColor: colors.sliderDotActive,
    },
    paginationDotInactive: {
      backgroundColor: colors.sliderDot,
    },
    paginationContainer: {
      backgroundColor: 'transparent',
    },
  })
)
