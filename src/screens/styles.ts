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
      height: 75 + PADDING_BOTTOM,
      paddingBottom: PADDING_BOTTOM,
      backgroundColor: colors.primary1,
      borderTopWidth: -1,
    },
    tabBarLabel: {
      textAlign: 'center',
      fontSize: 14,
      lineHeight: 19,
      color: colors.primary3,
      marginTop: -15,
    },
    activeTint: {
      color: colors.navigationLabelSelected,
    },
    inactiveTint: {
      color: colors.primary3,
    },
  })
)
