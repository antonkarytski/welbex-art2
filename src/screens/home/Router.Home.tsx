import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { createTabScreenDescription } from '../../navigation/helpers'
import { links } from '../../navigation/links'
import HomeIcon from '../../ui/icons/Icon.Home'
import CategoryScreen from './Screen.CompetitionCategory'
import HomeScreen from './Screen.Home'

const Stack = createNativeStackNavigator()

export default function HomeTabScreen() {
  return (
    <Stack.Navigator initialRouteName={links.home}>
      <Stack.Screen name={links.home} component={HomeScreen} />
      <Stack.Screen
        name={links.competitionCategory}
        component={CategoryScreen}
      />
    </Stack.Navigator>
  )
}

export const homeScreenDescription = createTabScreenDescription({
  Icon: HomeIcon,
  Component: HomeTabScreen,
  link: links.homeTab,
  label: (t) => t.home,
})
