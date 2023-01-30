import { NativeModules } from 'react-native'
import { IS_IOS } from '../helpers/native/constants'

/** 'en-US' | 'ru_RU | other */
const deviceLocale = IS_IOS
  ? NativeModules.SettingsManager.settings.AppleLanguages[0]
  : NativeModules.I18nManager.localeIdentifier

const deviceLocalesArray = IS_IOS
  ? deviceLocale.split('-')
  : deviceLocale.split('_')

export const deviceLanguage = deviceLocalesArray[0].toUpperCase()

export const deviceCountryCode = deviceLocalesArray[1]
