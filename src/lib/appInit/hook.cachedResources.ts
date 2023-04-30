import { Ionicons } from '@expo/vector-icons'
import { loadAsync } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'
import { apiManager } from '../../api/apiManager'
import { cameraPermission } from '../../features/camera/model.permissions'
import { onBoardingWasShownModel } from '../../features/onboarding/model'
import { meRequest } from '../../features/profile/request'
import * as FONTS from '../../styles/fonts'
import { configMobileAds } from '../ads/setup'
import { noop } from '../helpers'
import { IS_IOS } from '../helpers/native/constants'

async function loadResourcesAndData() {
  const Inter400 = require('../../../assets/fonts/Inter/Inter-Regular.ttf')
  const Inter500 = require('../../../assets/fonts/Inter/Inter-Medium.ttf')
  const Inter600 = require('../../../assets/fonts/Inter/Inter-SemiBold.ttf')
  const Inter700 = require('../../../assets/fonts/Inter/Inter-Bold.ttf')

  await loadAsync({
    ...Ionicons.font,
    [FONTS.FONT_REGULAR]: Inter400,
    [FONTS.FONT_MEDIUM]: Inter500,
    [FONTS.FONT_SEMI_BOLD]: Inter600,
    [FONTS.FONT_BOLD]: Inter700,
  })
}

SplashScreen.preventAutoHideAsync().catch(noop)
const showSplashScreen = (delay = IS_IOS ? 500 : 0) => {
  setTimeout(() => {
    SplashScreen.hideAsync().catch(noop)
  }, delay)
}

export function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  useEffect(() => {
    cameraPermission.init()
    Promise.all([
      configMobileAds(),
      loadResourcesAndData(),
      onBoardingWasShownModel.init(),
    ])
      .finally(() => {
        setLoadingComplete(true)
      })
      .then(() => apiManager.token.onInit().promise)
      .then((token) => {
        if (token) return meRequest()
      })
      .catch(noop)
  }, [])

  useEffect(() => {
    if (isLoadingComplete) showSplashScreen()
  }, [isLoadingComplete])

  return isLoadingComplete
}
