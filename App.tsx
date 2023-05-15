import { NavigationContainer } from '@react-navigation/native'
import * as Sentry from '@sentry/react-native'
import { StripeProvider } from '@stripe/stripe-react-native'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { STRIPE_TEST_PUBLISHING_KEY } from './src/constants/payments'
import AppPopUps from './src/features/popUp/AppPopUps'
import { useCachedResources } from './src/lib/appInit/hook.cachedResources'
import { sentryInit } from './src/lib/debug/sentry'
import { useLinkingSetUp } from './src/navigation/linking/hook'
import { linkingConfig } from './src/navigation/linking/linkingRouter'
import Router from './src/screens/Router'

sentryInit()

const App = () => {
  const isLoaded = useCachedResources()
  useLinkingSetUp()

  if (!isLoaded) return null

  return (
    <GestureHandlerRootView style={styles.container}>
      <NativeBaseProvider>
        <SafeAreaProvider>
          <StripeProvider publishableKey={STRIPE_TEST_PUBLISHING_KEY}>
            <NavigationContainer linking={linkingConfig}>
              <StatusBar style="dark" />
              <Router />
              <AppPopUps />
            </NavigationContainer>
          </StripeProvider>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  )
}

export default Sentry.wrap(App)

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
})
