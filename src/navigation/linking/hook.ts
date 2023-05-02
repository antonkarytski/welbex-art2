import { useEffect } from 'react'
import { Linking } from 'react-native'

export function useLinkingSetUp() {
  useEffect(() => {
    Linking.getInitialURL().then(() => {})
    const subscription = Linking.addEventListener('url', () => {})
    return subscription.remove
  }, [])
}
