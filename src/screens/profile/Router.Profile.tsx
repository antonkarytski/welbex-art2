import React from 'react'
import { Stack } from '../../navigation/elements/StackNavigator'
import TabStackNavigator from '../../navigation/elements/TabStackNavigator'
import { createTabScreenDescription } from '../../navigation/helpers'
import { links } from '../../navigation/links'
import ProfileIcon from '../../ui/icons/Icon.Profile'
import ProfileScreen from './Screen.Profile'

const ProfileRouterScreen = () => {
  return (
    <TabStackNavigator>
      <Stack.Screen name={links.profile} component={ProfileScreen} />
    </TabStackNavigator>
  )
}

export const profileTabDescription = createTabScreenDescription({
  Icon: ProfileIcon,
  Component: ProfileRouterScreen,
  link: links.profileTab,
  label: (t) => t.profile,
})
