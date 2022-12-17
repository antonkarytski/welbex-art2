import { Ionicons } from '@expo/vector-icons'
import * as Font from 'expo-font'
import { useEffect, useState } from 'react'

async function loadResourcesAndData() {
  const Inter400 = require('../../../assets/fonts/Inter/Inter-Regular.ttf')
  const Inter500 = require('../../../assets/fonts/Inter/Inter-Medium.ttf')
  const Inter600 = require('../../../assets/fonts/Inter/Inter-SemiBold.ttf')
  const Inter700 = require('../../../assets/fonts/Inter/Inter-Bold.ttf')

  await Font.loadAsync({
    ...Ionicons.font,
    'Inter-400': Inter400,
    'Inter-500': Inter500,
    'Inter-600': Inter600,
    'Inter-700': Inter700,
  })
}

export function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  useEffect(() => {
    loadResourcesAndData().finally(() => setLoadingComplete(true))
  }, [])

  return isLoadingComplete
}
