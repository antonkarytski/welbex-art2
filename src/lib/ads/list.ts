import { Platform } from 'react-native'
import { TestIds } from 'react-native-google-mobile-ads'
import mobileAds from 'react-native-google-mobile-ads'
import { AdsDescription, AdsType } from './types'

export const ADS_TEST_DEVICE_IDS = Platform.select({
  android: ['5684B082AFBD5D69BAA81148D3BE11CD'],
  ios: ['15b85262087954e2b5af1066908fc589'],
  default: [],
})
export enum AdsName {
  WORK_UPLOAD = 'WORK_UPLOAD',
  CATEGORIES = 'CATEGORIES',
  GALLERY = 'GALLERY',
}

type CreateAdsIdProps = {
  android: string
  ios: string
}

const createAdsId = (props: CreateAdsIdProps) =>
  Platform.select({ ...props, default: props.ios })

export const ADS_LIST: Record<AdsName, AdsDescription> = {
  [AdsName.WORK_UPLOAD]: {
    id: createAdsId({
      ios: 'ca-app-pub-1405242860258153/9818404791',
      android: 'ca-app-pub-1405242860258153/4625410568',
    }),
    type: AdsType.REWARDED,
  },
  [AdsName.CATEGORIES]: {
    id: createAdsId({
      ios: 'ca-app-pub-1405242860258153/1462476394',
      android: 'ca-app-pub-1405242860258153/8438948289',
    }),
    type: AdsType.BANNER,
  },
  [AdsName.GALLERY]: {
    id: createAdsId({
      ios: 'ca-app-pub-1405242860258153/3079628634',
      android: 'ca-app-pub-1405242860258153/2532833729',
    }),
    type: AdsType.BANNER,
  },
}

export const getAds = (name: AdsName): AdsDescription => {
  const ads = ADS_LIST[name]
  if (__DEV__) return { ...ads, id: TestIds[ads.type] }
  return ads
}
