import { createEffect, createStore } from 'effector'
import mobileAds from 'react-native-google-mobile-ads'
import { IS_IOS } from '../helpers/native/constants'
import { ADS_TEST_DEVICE_IDS } from './list'
import { iosAppTrackingTransparencyPermission } from './model.permissions'

export const initAds = createEffect(async () => {
  if (IS_IOS) {
    const isGranted = await iosAppTrackingTransparencyPermission.check()
    if (!isGranted) return null
  }
  if (__DEV__) {
    await mobileAds().setRequestConfiguration({
      testDeviceIdentifiers: ADS_TEST_DEVICE_IDS,
    })
  }
  await mobileAds().initialize()
  return true
})
export const $isAdsInitialized = createStore(false).on(
  initAds.done,
  (_, { result }) => !!result
)
