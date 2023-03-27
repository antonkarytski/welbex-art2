import { TestIds } from 'react-native-google-mobile-ads'
import { AdsDescription, AdsType } from './types'

export enum AdsName {
  WORK_UPLOAD = 'WORK_UPLOAD',
  CATEGORIES_SEPARATOR = 'CATEGORIES_SEPARATOR',
}

export const ADS_LIST = {
  [AdsName.WORK_UPLOAD]: {
    id: 'ca-app-pub-1405242860258153/9818404791',
    type: AdsType.REWARDED,
  },
  [AdsName.CATEGORIES_SEPARATOR]: {
    id: 'ca-app-pub-1405242860258153/9843305582',
    type: AdsType.BANNER,
  },
} as const

export const getAds = (name: AdsName): AdsDescription => {
  const ads = ADS_LIST[name]
  if (__DEV__) return { ...ads, id: TestIds[ads.type] }
  return ads
}
