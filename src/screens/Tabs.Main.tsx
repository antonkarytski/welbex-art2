import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { useThemedStyle } from '../features/themed/hooks'
import { links } from '../navigation/links'
import { ScreenDescriptor } from '../navigation/types'
import { useText } from '../translations/hook'
import { homeScreenDescription } from './home/Router.Home'
import { mainTabBarThemedStyles } from './styles'

const BottomTab = createBottomTabNavigator()

const SCREENS: ScreenDescriptor[] = [homeScreenDescription]

const MainTabsRouter = React.memo(() => {
  const styles = useThemedStyle(mainTabBarThemedStyles)
  const text = useText()

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: (styles.activeTint as { color: string }).color,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
      initialRouteName={links.homeTab}
    >
      {SCREENS.map(({ label, link, Icon, Component, customButton }) => {
        return (
          <BottomTab.Screen
            key={link}
            options={{
              headerShown: false,
              tabBarIcon: (p) => Icon({ ...p, size: 20 }),
              title: label(text),
              tabBarButton: customButton,
            }}
            name={link}
            component={Component}
          />
        )
      })}
    </BottomTab.Navigator>
  )

  // return (
  //   <BottomTab.Navigator>
  //     <BottomTab.Screen name={links.gallery} component={GalleryRouter} />
  //     <BottomTab.Screen name={links.createPost} component={CreatePostRouter} />
  //     <BottomTab.Screen name={links.profile} component={ProfileRouter} />
  //   </BottomTab.Navigator>
  // )
})

export default MainTabsRouter
