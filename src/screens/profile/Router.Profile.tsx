import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { ProfileIcon } from 'altek-ui'
import { createTabScreenDescription } from '../../navigation/helpers'
import { links } from '../../navigation/links'
import PlusIcon from '../../ui/icons/Icon.Plus'
import EditProfileScreen from './Screen.EditProfile'
import ProfileScreen from './Screen.Profile'

const Stack = createNativeStackNavigator()

const ProfileRouterScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={links.profile} component={ProfileScreen} />
      <Stack.Screen name={links.editProfile} component={EditProfileScreen} />
    </Stack.Navigator>
  )
}

export const profileTabDescription = createTabScreenDescription({
  Icon: ProfileIcon,
  Component: ProfileRouterScreen,
  link: links.profileTab,
  label: (t) => t.profile,
})
