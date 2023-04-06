import { createStateModel } from 'altek-toolkit'
import { onboardingSliderData } from './onboardingSliderData'

export const activeSlideModel = createStateModel(0)

export const $isLastSlideActive = activeSlideModel.$state.map(
  (activeSlideIndex) => {
    return activeSlideIndex === onboardingSliderData.length - 1
  }
)
