import { createEffect, createStore } from 'effector'
import mobileAds from 'react-native-google-mobile-ads'
import { iosAppTrackingTransparencyPermission } from './model.permissions'

export const initAds = createEffect(async () => {
  const isGranted = await iosAppTrackingTransparencyPermission.check()
  if (!isGranted) return null
  await mobileAds().initialize()
  return isGranted
})
export const $isAdsInitialized = createStore(false).on(
  initAds.done,
  (_, { result }) => !!result
)
