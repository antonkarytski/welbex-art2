export enum AdsType {
  APP_OPEN = 'APP_OPEN',
  BANNER = 'BANNER',
  INTERSTITIAL = 'INTERSTITIAL',
  REWARDED_INTERSTITIAL = 'REWARDED_INTERSTITIAL',
  REWARDED = 'REWARDED',
}

export type AdsDescription = {
  id: string
  type: AdsType
}
