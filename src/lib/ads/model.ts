import { createEffect, createStore } from 'effector'
import mobileAds from 'react-native-google-mobile-ads'

export const initAds = createEffect(mobileAds().initialize)
export const $isAdsInitialized = createStore(false).on(initAds.done, () => true)
