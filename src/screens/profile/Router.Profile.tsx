import React from 'react'
import { ProfileIcon } from 'altek-ui'
import { Stack } from '../../navigation/elements/StackNavigator'
import TabStackNavigator from '../../navigation/elements/TabStackNavigator'
import { createTabScreenDescription } from '../../navigation/helpers'
import { links } from '../../navigation/links'
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
