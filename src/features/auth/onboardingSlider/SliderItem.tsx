import React from 'react'
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { WINDOW_HEIGHT, getHeight } from '../../../lib/device/dimensions'
import { LangStructure } from '../../../translations/types'
import Span from '../../../ui/Span'
import { OnboardingSliderItem } from './onboardingSliderData'

type SliderItemProps = {
  item: OnboardingSliderItem
  text: LangStructure
  style?: {
    img?: StyleProp<ImageStyle>
    imgWrp?: StyleProp<ViewStyle>
    caption?: StyleProp<TextStyle>
  }
}
const imageHeight = getHeight({
  percentOfScreenSize: WINDOW_HEIGHT < 630 ? 47 : 43,
})

const imageWidth = imageHeight * 0.93

const SliderItem = ({ item, style, text }: SliderItemProps) => {
  return (
    <View style={styles.container}>
      <View style={[style?.imgWrp, styles?.imgWrp]}>
        <Image style={[style?.img, styles?.img]} source={item.img} />
      </View>
      <Span label={item.description(text)} style={style?.caption} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    marginHorizontal: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  imgWrp: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  img: {
    width: imageWidth,
    height: imageHeight,
  },
  toBottom: {
    marginTop: 'auto',
  },
})

export default SliderItem
