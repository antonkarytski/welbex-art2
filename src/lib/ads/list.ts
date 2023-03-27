import { TestIds } from 'react-native-google-mobile-ads'
import { AdsDescription, AdsType } from './types'

export enum AdsName {
  WORK_UPLOAD = 'WORK_UPLOAD',
}

const ADS: Record<AdsName, AdsDescription> = {
  [AdsName.WORK_UPLOAD]: {
    id: 'ca-app-pub-1405242860258153/9818404791',
    type: AdsType.REWARDED,
  },
}

export const getAds = (name: AdsName): AdsDescription => {
  const ads = ADS[name]
  if (__DEV__) return { ...ads, id: TestIds[ads.type] }
  return ads
}
