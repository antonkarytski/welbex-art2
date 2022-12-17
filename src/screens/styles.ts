import { Platform, StyleSheet } from 'react-native'
import { createThemedStyle } from '../features/themed'

const PADDING_BOTTOM_IOS = 35
const PADDING_BOTTOM_ANDROID = 10
const PADDING_BOTTOM = Platform.select({
  ios: PADDING_BOTTOM_IOS,
  default: PADDING_BOTTOM_ANDROID,
})
export const mainTabBarThemedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    tabBar: {
      height: 63 + PADDING_BOTTOM,
      paddingBottom: PADDING_BOTTOM,
      backgroundColor: colors.primary1,
      borderTopWidth: -1,
    },
    tabBarLabel: {
      marginTop: 3,
      textAlign: 'center',
      fontSize: 9,
      lineHeight: 12,
      color: colors.navigationLabelSelected,
    },
    activeTint: {
      color: colors.primary3,
    },
  })
)
