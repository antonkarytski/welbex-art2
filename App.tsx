import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import './src/api'
import AppPopUps from './src/features/popUp/AppPopUps'
import { useCachedResources } from './src/lib/appInit/hook.cachedResources'
import Router from './src/screens/Router'

export default function App() {
  const isLoaded = useCachedResources()

  // useEffect(() => {
  //   fetch('http://45.8.97.189/api/v1/users/me', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization:
  //         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJleHAiOjE2NzY1NDUzMjh9.E6UpI0BYWbYN4lq8zUt0NM8hEEn5TW0hRrPT9THrLMY',
  //     },
  //     method: 'GET',
  //   })
  //     .then((e) => {
  //       console.log(e.headers)
  //       e.json().then((e) => {
  //         console.log(JSON.stringify(e))
  //       })
  //       console.log(e)
  //       console.log('success')
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //     })
  // }, [])

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
