import React from 'react'
import { Stack } from '../../navigation/elements/StackNavigator'
import TabStackNavigator from '../../navigation/elements/TabStackNavigator'
import { createTabScreenDescription } from '../../navigation/helpers'
import { links } from '../../navigation/links'
import HomeIcon from '../../ui/icons/Icon.Home'
import CategoryDetailsScreen from './Screen.CategoryDetails'
import HomeScreen from './Screen.Home'

function HomeTabScreen() {
  return (
    <TabStackNavigator initialRoute={links.home}>
      <Stack.Screen name={links.home} component={HomeScreen} />
      <Stack.Screen
        name={links.categoryDetails}
        component={CategoryDetailsScreen}
      />
    </TabStackNavigator>
  )
}

export const homeTabDescription = createTabScreenDescription({
  Icon: HomeIcon,
  Component: HomeTabScreen,
  link: links.homeTab,
  label: (t) => t.home,
})
