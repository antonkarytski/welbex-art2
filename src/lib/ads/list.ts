import { TestIds } from 'react-native-google-mobile-ads'
import { AdsDescription, AdsType } from './types'

export enum AdsName {
  WORK_UPLOAD = 'WORK_UPLOAD',
  CATEGORIES = 'CATEGORIES',
  GALLERY = 'GALLERY',
}

export const ADS_LIST: Record<AdsName, AdsDescription> = {
  [AdsName.WORK_UPLOAD]: {
    id: 'ca-app-pub-1405242860258153/9818404791',
    type: AdsType.REWARDED,
  },
  [AdsName.CATEGORIES]: {
    id: 'ca-app-pub-1405242860258153/9843305582',
    type: AdsType.BANNER,
  },
  [AdsName.GALLERY]: {
    id: 'ca-app-pub-1405242860258153/2705970029',
    type: AdsType.BANNER,
  },
}

export const getAds = (name: AdsName): AdsDescription => {
  const ads = ADS_LIST[name]
  if (__DEV__) return { ...ads, id: TestIds[ads.type] }
  return ads
}
