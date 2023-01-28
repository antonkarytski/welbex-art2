import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppPopUps from './src/features/popUp/AppPopUps'
import { useCachedResources } from './src/lib/appInit/hook.cachedResources'
import Router from './src/screens/Router'

export default function App() {
  const isLoaded = useCachedResources()

  if (!isLoaded) return null
  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Router />
          <AppPopUps />
        </NavigationContainer>
      </SafeAreaProvider>
    </NativeBaseProvider>
  )
}
