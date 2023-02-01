import { StyleSheet } from 'react-native'
import { createThemedStyle } from '../../../features/themed'
import { getSize } from '../../../lib/device/dimensions'

const imageWidth = getSize({})
const imageHeight = imageWidth * 1.075
const imageBottomMargin = getSize({
  measureName: 'height',
  percentOfScreenSize: 8.5,
  paddingSize: 0,
})

const imageCaptionBottomMargin = getSize({
  measureName: 'height',
  percentOfScreenSize: 3,
  paddingSize: 0,
})

export const themedGreetingsStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    caption: {
      color: colors.text,
      fontSize: 18,
      textAlign: 'center',
      marginBottom: imageCaptionBottomMargin,
    },
    text: {
      color: colors.text,
      fontSize: 14,
      textAlign: 'center',
    },
    subCaptionText: {},
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
      marginBottom: imageBottomMargin,
    },
    paginationDot: {
      backgroundColor: colors.detailsActive,
    },
    paginationDotInactive: {
      backgroundColor: colors.detailsInactive,
    },
    paginationContainer: {
      backgroundColor: 'transparent',
      marginBottom: imageCaptionBottomMargin,
      paddingVertical: 8,
    },
    marginBottom: {
      marginBottom: 24,
    },
  })
)
