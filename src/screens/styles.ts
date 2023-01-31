import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { createThemedStyle } from '../features/themed'

const PADDING_BOTTOM_IOS = 35
const PADDING_BOTTOM_ANDROID = 10
const PADDING_BOTTOM = Platform.select({
  ios: PADDING_BOTTOM_IOS,
  default: PADDING_BOTTOM_ANDROID,
})

export const mainTabBarThemedStyles = createThemedStyle((colors) =>
  StyleSheet.create<MainTabBarStyles>({
    tabBar: {
      height: 75 + PADDING_BOTTOM,
      paddingBottom: PADDING_BOTTOM,
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingHorizontal: 32,
    },
    row: {
      justifyContent: 'space-between',
    },
    tabBarLabel: {
      textAlign: 'center',
      fontSize: 14,
      lineHeight: 19,
      color: colors.bottomTabInactiveItem,
    },
    activeTint: {
      color: colors.bottomTabActiveItem,
    },
    inactiveTint: {
      color: colors.bottomTabInactiveItem,
    },
  })
)

export type MainTabBarStyles = {
  tabBar: ViewStyle
  row: ViewStyle
  tabBarLabel: TextStyle
  activeTint: TextStyle
  inactiveTint: TextStyle
}
