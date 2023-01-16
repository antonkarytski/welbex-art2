import { createStateModel } from 'altek-toolkit'
import { onboardingSliderData } from './onboardingSliderData'

const sliderData = onboardingSliderData()
export const activeSlideModel = createStateModel(0)

export const $isLastSlideActive = activeSlideModel.$state.map(
  (activeSlideIndex) => {
    return activeSlideIndex === sliderData.length - 1
  }
)
