import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import React from 'react'
import { MagicModalPortal } from 'react-native-magic-modal'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useCachedResources } from './src/lib/appInit/hook.cachedResources'
import Router from './src/screens/Router'
import AuthRouter from './src/screens/auth/Router.Auth'

export default function App() {
  const isLoaded = useCachedResources()

  if (!isLoaded) return null
  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <MagicModalPortal />
          <StatusBar style="auto" />
          <AuthRouter />
        </NavigationContainer>
      </SafeAreaProvider>
    </NativeBaseProvider>
  )
}
