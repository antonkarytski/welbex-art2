import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { useTheme } from '../features/themed/hooks'
import CustomBottomTab from '../navigation/elements/MainBottomTabBar'
import { links } from '../navigation/links'
import { ScreenDescriptor } from '../navigation/types'
import { useText } from '../translations/hook'
import { createPostTabDescription } from './createPost/Router.CreatePost'
import { galleryTabDescription } from './gallery/Router.Gallery'
import { homeTabDescription } from './home/Router.Home'
import { profileTabDescription } from './profile/Router.Profile'
import { mainTabBarThemedStyles } from './styles'

const BottomTab = createBottomTabNavigator()

const SCREENS: ScreenDescriptor[] = [
  homeTabDescription,
  galleryTabDescription,
  createPostTabDescription,
  profileTabDescription,
]

const MainTabsRouter = React.memo(() => {
  const { styles, colors } = useTheme(mainTabBarThemedStyles)
  const text = useText()

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={links.homeTab}
      tabBar={({ ...props }) => (
        <CustomBottomTab {...props} colors={colors} style={styles} />
      )}
      backBehavior={'order'}
    >
      {SCREENS.map(({ label, link, Icon, Component, customButton }) => {
        return (
          <BottomTab.Screen
            key={link}
            options={{
              headerShown: false,
              tabBarIcon: Icon,
              title: label(text),
              tabBarButton: customButton,
              lazy: true,
            }}
            name={link}
            component={Component}
          />
        )
      })}
    </BottomTab.Navigator>
  )
})

export default MainTabsRouter
