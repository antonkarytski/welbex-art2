import { AdsName } from '../../lib/ads/list'
import { createAdsModel } from '../../lib/ads/model'

export const createPostAds = createAdsModel(AdsName.WORK_UPLOAD, {
  filter: ({ posts }) => posts > 0,
})

if (__DEV__) {
  createPostAds.debug({ ignoreFilter: true })
}
