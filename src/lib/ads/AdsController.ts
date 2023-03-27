import {
  RewardedAd,
  RewardedAdEventType,
  RewardedAdReward,
} from 'react-native-google-mobile-ads'
import { AdsName, getAds } from './list'

export class AdsController {
  private ads

  constructor(name: AdsName) {
    const descriptor = getAds(name)
    this.ads = RewardedAd.createForAdRequest(descriptor.id)
    this.ads.load()
  }

  public readonly show = () => {
    return new Promise<RewardedAdReward>((resolve) => {
      if (!this.ads.loaded) {
        const removeListener = this.ads.addAdEventListener(
          RewardedAdEventType.LOADED,
          () => {
            this.show().then(resolve)
            removeListener()
          }
        )
        return
      }

      this.ads.show()
      const removeFinishListener = this.ads.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        (e) => {
          resolve(e)
          removeFinishListener()
        }
      )
    })
  }
}

export const createAds = (name: AdsName) => {
  return new AdsController(name)
}
