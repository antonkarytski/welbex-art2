import { useStore } from 'effector-react'
import React, { useCallback, useEffect, useRef } from 'react'
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'
import { Pagination } from 'react-native-snap-carousel'
import { useStateStore } from 'altek-toolkit'
import {
  SCREEN_WIDTH,
  WINDOW_HEIGHT,
  getHeight,
} from '../../lib/device/dimensions'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import PresetButton from '../../ui/buttons/PresetButton'
import { PresetButtonStates } from '../../ui/buttons/types'
import SliderItem from './SliderItem'
import { $isLastSlideActive, activeSlideModel } from './model.onboardingSlider'
import {
  OnboardingSliderItem,
  onboardingSliderData,
} from './onboardingSliderData'

export type OnboardingSliderStyles = {
  img?: StyleProp<ImageStyle>
  imgWrp?: StyleProp<ViewStyle>
  caption?: StyleProp<TextStyle>
  paginationDot?: StyleProp<ViewStyle>
  paginationDotInactive?: StyleProp<ViewStyle>
  paginationContainer?: StyleProp<ViewStyle>
  button?: PresetButtonStates
}

type OnboardingSliderProps = {
  onSnapToItem?: (index: number) => void
  style?: OnboardingSliderStyles
}

type RenderItemProps = { item: OnboardingSliderItem }

const carouselHeight = getHeight({
  percentOfScreenSize: 60,
})
const carouselWidth = SCREEN_WIDTH

const OnboardingSlider = ({ style }: OnboardingSliderProps) => {
  const t = useText()
  const navigate = useNavigate()
  const [activeSlideIndex, setActiveSlideIndex] =
    useStateStore(activeSlideModel)
  const isLastSlideActive = useStore($isLastSlideActive)
  const carouselRef = useRef<ICarouselInstance>(null)

  useEffect(() => {
    setActiveSlideIndex(0)
  }, [setActiveSlideIndex])

  const renderItem = useCallback(
    ({ item }: RenderItemProps) => (
      <SliderItem item={item} text={t} style={style} />
    ),
    [style, t]
  )

  const onSnapToItem = (index: number) => {
    setActiveSlideIndex(index)
  }

  const onGoNext = () => {
    if (isLastSlideActive) {
      navigate(links.signUp)
      return
    }
    carouselRef.current?.next()
    setActiveSlideIndex(activeSlideIndex + 1)
  }

  return (
    <View style={[styles.wrapper]}>
      <Carousel
        data={onboardingSliderData}
        renderItem={renderItem}
        onSnapToItem={onSnapToItem}
        height={carouselHeight}
        width={carouselWidth}
        vertical={false}
        ref={carouselRef}
      />
      <View style={styles.sliderControlsWrapper}>
        <Pagination
          dotsLength={onboardingSliderData.length}
          activeDotIndex={activeSlideIndex}
          containerStyle={[
            styles.paginationContainer,
            style?.paginationContainer,
          ]}
          dotStyle={[styles.paginationDot, style?.paginationDot]}
          inactiveDotStyle={[
            style?.paginationDot,
            style?.paginationDotInactive,
          ]}
          dotContainerStyle={styles.dotContainer}
          inactiveDotOpacity={1}
          inactiveDotScale={1}
        />
        <PresetButton
          label={isLastSlideActive ? t.createNewAccount : t.next}
          onPress={onGoNext}
          preset={style?.button}
          style={styles.buttonNext}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
  },
  dotContainer: {
    marginHorizontal: 4,
  },
  paginationContainer: {
    marginTop: 'auto',
  },
  sliderControlsWrapper: {
    paddingHorizontal: 20,
  },
  buttonNext: {
    marginTop: 'auto',
    paddingVertical: WINDOW_HEIGHT < 630 ? 10 : 16,
  },
})

export default OnboardingSlider
