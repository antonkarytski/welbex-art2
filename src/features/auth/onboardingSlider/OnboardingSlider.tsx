import { useStore } from 'effector-react'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { useStateStore } from 'altek-toolkit'
import { getSize } from '../../../lib/dimensions/getSize'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
import { useText } from '../../../translations/hook'
import Span from '../../../ui/Span'
import PresetButton from '../../../ui/buttons/PresetButton'
import { PresetButtonStates } from '../../../ui/buttons/types'
import SliderItem from './SliderItem'
import { $isLastSlideActive, activeSlideModel } from './model.onboardingSlider'
import {
  OnboardingSliderItem,
  onboardingSliderData,
} from './onboardingSliderData'

type OnboardingSliderProps = {
  onSnapToItem?: (index: number) => void
  style?: {
    img: StyleProp<ImageStyle>
    imgWrp: StyleProp<ViewStyle>
    caption: StyleProp<TextStyle>
    paginationDot: StyleProp<ViewStyle>
    paginationDotInactive: StyleProp<ViewStyle>
    paginationContainer: StyleProp<ViewStyle>
    button: PresetButtonStates
  }
}

type RenderItemProps = { item: OnboardingSliderItem }

const imageWidth = getSize({})

const OnboardingSlider = ({ style }: OnboardingSliderProps) => {
  const t = useText()
  const navigate = useNavigate()
  const [activeSlideIndex, setActiveSlideIndex] =
    useStateStore(activeSlideModel)
  const isLastSlideActive = useStore($isLastSlideActive)
  const data = useMemo(() => onboardingSliderData(t), [t])
  const carouselRef = useRef<Carousel<OnboardingSliderItem>>(null)

  useEffect(() => {
    setActiveSlideIndex(0)
  }, [])

  const renderItem = useCallback(
    ({ item }: RenderItemProps) => <SliderItem item={item} style={style} />,
    [style]
  )

  const onGoNext = () => {
    if (isLastSlideActive) {
      navigate(links.signUp)
      return
    }
    carouselRef.current?.snapToNext()
    setActiveSlideIndex(activeSlideIndex + 1)
  }

  return (
    <View style={styles.wrapper}>
      <Carousel
        data={data}
        renderItem={renderItem}
        onSnapToItem={setActiveSlideIndex}
        sliderWidth={imageWidth}
        itemWidth={imageWidth}
        vertical={false}
        enableSnap
        scrollEnabled
        useScrollView
        ref={carouselRef}
      />
      <Pagination
        dotsLength={data.length}
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
    flexGrow: 1,
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
