import { StyleSheet } from 'react-native'
import { createThemedStyle } from '../../../features/themed'
import { WINDOW_HEIGHT, getHeight } from '../../../lib/device/dimensions'

const imageHeight = getHeight({
  percentOfScreenSize: 40,
})

const imageWidth = imageHeight * 0.93

const imageBottomMargin = getHeight({
  percentOfScreenSize: WINDOW_HEIGHT < 630 ? 4 : 8,
  paddingSize: 0,
})

const imageCaptionBottomMargin = getHeight({
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
      marginLeft: 'auto',
      marginRight: 'auto',
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
    buttonNext: {
      paddingVertical: WINDOW_HEIGHT < 630 ? 10 : 16,
    },
  })
)
