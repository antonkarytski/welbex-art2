import { StyleSheet } from 'react-native'
import { createThemedStyle } from '../../../features/themed'
import { getSize } from '../../../lib/device/dimensions'

const imageWidth = getSize({})
const imageHeight = imageWidth * 1.075

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
      width: imageWidth,
      height: imageHeight,
    },
    imgWrp: {
      borderRadius: 10,
      overflow: 'hidden',
      marginTop: 13,
      marginBottom: 60,
    },
    paginationDot: {
      backgroundColor: colors.detailsActive,
    },
    paginationDotInactive: {
      backgroundColor: colors.detailsInactive,
    },
    paginationContainer: {
      backgroundColor: 'transparent',
    },
  })
)
