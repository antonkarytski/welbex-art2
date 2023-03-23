import { deviceLanguage } from '../lib/device/localization'
import { Languages } from './types'

export const DEFAULT_LANGUAGE = Object.values(Languages).includes(
  deviceLanguage as unknown as Languages
)
  ? deviceLanguage
  : Languages.EN
