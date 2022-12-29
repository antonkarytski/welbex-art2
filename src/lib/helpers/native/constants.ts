import { Platform } from 'react-native'

export const ANDROID = 'android'
export const IOS = 'ios'
export const IS_IOS = Platform.OS === IOS
export const IS_ANDROID = Platform.OS === ANDROID
export const VERSION = Platform.Version
export const IS_ANDROID_VERSION_LOWER_8 = IS_ANDROID && VERSION <= 25

