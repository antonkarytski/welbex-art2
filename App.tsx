import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useCachedResources } from './src/lib/appInit/hook.cachedResources'
import Router from './src/screens/Router'
import AuthRouter from './src/screens/auth/Router.Auth'

export default function App() {
  const isLoaded = useCachedResources()

  if (!isLoaded) return null
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Router />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
