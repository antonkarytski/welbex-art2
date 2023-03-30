import { ImageSourcePropType } from 'react-native'
import { LangFn } from '../../translations/types'

const viewDrawingsImg = require('../../../assets/images/onboarding_view_drawings.png')
const uploadDrawingsImg = require('../../../assets/images/onboarding_upload_drawings.png')
const getRewardsImg = require('../../../assets/images/onboarding_get_rewards.png')

export type OnboardingSliderItem = {
  indexNumber: number
  img: ImageSourcePropType
  description: LangFn
}

export const onboardingSliderData: OnboardingSliderItem[] = [
  {
    indexNumber: 0,
    img: viewDrawingsImg,
    description: (text) => text.viewAndLikeChildrenDrawings,
  },
  {
    indexNumber: 1,
    img: uploadDrawingsImg,
    description: (text) => text.uploadYourChildDrawings,
  },
  {
    indexNumber: 2,
    img: getRewardsImg,
    description: (text) => text.winAndGetRewards,
  },
]
