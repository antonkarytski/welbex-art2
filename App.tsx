import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import React, { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import './src/api'
import { api } from './src/api'
import AppPopUps from './src/features/popUp/AppPopUps'
import { useCachedResources } from './src/lib/appInit/hook.cachedResources'
import Router from './src/screens/Router'

export default function App() {
  const isLoaded = useCachedResources()

  useEffect(() => {
    api.auth
      .login({
        username: 'Ak@ak.com',
        password: '1234',
      })
      .then((e) => {
        console.log(e)
      })
      .catch((e) => {
        console.log(JSON.stringify(e))
      })
  }, [])

  if (!isLoaded) return null
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <Router />
            <AppPopUps />
          </NavigationContainer>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  )
}
