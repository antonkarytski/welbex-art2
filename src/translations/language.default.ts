import { NativeModules } from 'react-native'
import { IS_IOS } from '../lib/helpers/native/constants'
import { Languages } from './types'

/** 'en-US' | 'ru_Us | other */
const deviceLocale = IS_IOS
  ? NativeModules.SettingsManager.settings.AppleLanguages[0]
  : NativeModules.I18nManager.localeIdentifier

const deviceLanguage = (
  IS_IOS ? deviceLocale.split('-') : deviceLocale.split('_')
)[0].toUpperCase()

export const DEFAULT_LANGUAGE = Object.values(Languages).includes(
  deviceLanguage as unknown as Languages
)
  ? deviceLanguage
  : Languages.EN
