import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { links } from '../../navigation/links'
import CountrySelectionScreen from './Screen.CountrySelection'
import NewPasswordScreen from './Screen.CreateNewPassword'
import CreatePasswordScreen from './Screen.CreatePassword'
import LoginScreen from './Screen.Login'
import PhoneEnterScreen from './Screen.PhoneEnter'
import RecoverPasswordScreen from './Screen.RecoverPassword'
import SignUpScreen from './Screen.SignUp'
import VerificationScreen from './Screen.Verification'

const Stack = createNativeStackNavigator()

export default function AuthScreenRouter() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={links.signUp} component={SignUpScreen} />
      <Stack.Screen
        name={links.countrySelection}
        component={CountrySelectionScreen}
      />
      <Stack.Screen name={links.login} component={LoginScreen} />
      <Stack.Screen name={links.phoneEnter} component={PhoneEnterScreen} />
      <Stack.Screen name={links.verification} component={VerificationScreen} />
      <Stack.Screen
        name={links.createPassword}
        component={CreatePasswordScreen}
      />
      <Stack.Screen
        name={links.recoverPassword}
        component={RecoverPasswordScreen}
      />
      <Stack.Screen
        name={links.createNewPassword}
        component={NewPasswordScreen}
      />
    </Stack.Navigator>
  )
}
