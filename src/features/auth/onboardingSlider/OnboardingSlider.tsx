import { useStore } from 'effector-react'
import React, { useCallback, useEffect, useMemo } from 'react'
import {
  Image,
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
import { $isLastSlideActive, activeSlideModel } from './model.onboardingSlider'
import { onboardingSliderData } from './onboardingSliderData'

type renderItemProps = {
  item: any
  index: number
}

type GreetingSliderProps = {
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
const imageWidth = getSize({})

const OnboardingSlider = ({ style }: GreetingSliderProps) => {
  const t = useText()
  const navigate = useNavigate()
  const [activeSlideIndex, setActiveSlideIndex] =
    useStateStore(activeSlideModel)
  const isLastSlideActive = useStore($isLastSlideActive)
  const data = useMemo(() => onboardingSliderData(t), [t])

  useEffect(() => {
    setActiveSlideIndex(0)
  }, [])

  const renderItem = useCallback(
    ({ item, index }: renderItemProps) => {
      return (
        <View>
          <View style={[style?.imgWrp]}>
            <Image style={[styles?.img, style?.img]} source={item.img} />
          </View>
          <Span label={item.description} style={style?.caption} />
        </View>
      )
    },
    [style]
  )

  const onGoNext = () => {
    if (isLastSlideActive) {
      navigate(links.login)
      return
    }
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

  imgWrp: {},
  img: {},
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
