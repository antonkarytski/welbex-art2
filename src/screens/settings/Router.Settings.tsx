import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { links } from '../../navigation/links'
import DeleteAccountScreen from './Screen.DeleteAccount'
import FaqScreen from './Screen.Faq'
import FeedBackScreen from './Screen.FeedBack'
import LanguageScreen from './Screen.Language'
import NotificationsScreen from './Screen.Notifications'
import SettingsScreen from './Screen.Settings'

const Stack = createNativeStackNavigator()

export default function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName={links.settings}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={links.settings} component={SettingsScreen} />
      <Stack.Screen name={links.faq} component={FaqScreen} />
      <Stack.Screen name={links.feedback} component={FeedBackScreen} />
      <Stack.Screen name={links.language} component={LanguageScreen} />
      <Stack.Screen
        name={links.notifications}
        component={NotificationsScreen}
      />
      <Stack.Screen
        name={links.deleteAccount}
        component={DeleteAccountScreen}
      />
    </Stack.Navigator>
  )
}
