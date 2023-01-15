import React, { useCallback, useMemo, useState } from 'react'
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
import { getSize } from '../../../lib/dimensions/getSize'
import { useText } from '../../../translations/hook'
import Span from '../../../ui/Span'
import { list } from './list'

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
  }
}

const GreetingSlider = ({ onSnapToItem, style }: GreetingSliderProps) => {
  const t = useText()
  const data = useMemo(() => list({ text: t }), [t])
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const imageWidth = getSize({})
  const imageHeight = imageWidth * 1.075

  const renderItem = useCallback(
    ({ item, index }: renderItemProps) => {
      return (
        <>
          <View style={[{ height: imageHeight }, style?.imgWrp]}>
            <Image style={style?.img} source={item.img} />
          </View>
          <Span label={item.description} style={style?.caption} />
        </>
      )
    },
    [style, imageHeight]
  )
  return (
    <View style={styles.wrapper}>
      <Carousel
        data={data}
        renderItem={renderItem}
        // onSnapToItem={setActiveSlideIndex}
        sliderWidth={imageWidth}
        itemWidth={imageWidth}
        vertical={false}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlideIndex}
        containerStyle={[
          styles.paginationContainer,
          style?.paginationContainer,
        ]}
        dotStyle={[styles.paginationDot, style?.paginationDot]}
        inactiveDotStyle={[style?.paginationDot, style?.paginationDotInactive]}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
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
  paginationContainer: {
    marginTop: 'auto',
  },
})

export default GreetingSlider
