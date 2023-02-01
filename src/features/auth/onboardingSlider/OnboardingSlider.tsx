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
import { getSize } from '../../../lib/device/dimensions'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
import { useText } from '../../../translations/hook'
import PresetButton from '../../../ui/buttons/PresetButton'
import { PresetButtonStates } from '../../../ui/buttons/types'
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

const imageWidth = getSize({})
const carouselHeight = getSize({
  measureName: 'height',
  ratioToScreenSize: 1.57,
})

const OnboardingSlider = ({ style }: OnboardingSliderProps) => {
  const t = useText()
  const navigate = useNavigate()
  const [activeSlideIndex, setActiveSlideIndex] =
    useStateStore(activeSlideModel)
  const isLastSlideActive = useStore($isLastSlideActive)
  const carouselRef = useRef<ICarouselInstance>(null)

  useEffect(() => {
    setActiveSlideIndex(0)
  }, [])

  const renderItem = useCallback(
    ({ item }: RenderItemProps) => (
      <SliderItem item={item} text={t} style={style} />
    ),
    [style, t]
  )

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
        onSnapToItem={setActiveSlideIndex}
        height={carouselHeight}
        width={imageWidth}
        vertical={false}
        ref={carouselRef}
      />
      <Pagination
        dotsLength={onboardingSliderData.length}
        activeDotIndex={activeSlideIndex}
        containerStyle={[styles.toBottom, style?.paginationContainer]}
        dotStyle={[styles.paginationDot, style?.paginationDot]}
        inactiveDotStyle={[style?.paginationDot, style?.paginationDotInactive]}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
      <PresetButton
        label={t.next}
        onPress={onGoNext}
        preset={style?.button}
        style={styles.toBottom}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 32,
  },
  paginationDot: {
    width: 8,
    height: 8,
    marginHorizontal: 4,
  },
  toBottom: {
    marginTop: 'auto',
  },
})

export default OnboardingSlider
