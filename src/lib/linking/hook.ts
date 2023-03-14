import { useEffect } from 'react'
import { Linking } from 'react-native'

Linking.addEventListener('url', (e) => {
  const params = new URL(e.url)
  console.log(params)
})

export function useLinkingSetUp() {
  useEffect(() => {
    Linking.getInitialURL().then((e) => {})
  }, [])
}
