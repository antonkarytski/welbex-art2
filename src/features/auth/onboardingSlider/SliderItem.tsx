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
import Span from '../../../ui/Span'
import { OnboardingSlider } from './onboardingSliderData'

type SliderItemProps = {
  item: OnboardingSlider
  style?: {
    img: StyleProp<ImageStyle>
    imgWrp: StyleProp<ViewStyle>
    caption: StyleProp<TextStyle>
  }
}

const SliderItem = ({ item, style }: SliderItemProps) => {
  return (
    <View>
      <View style={[style?.imgWrp]}>
        <Image style={[styles?.img, style?.img]} source={item.img} />
      </View>
      <Span label={item.description} style={style?.caption} />
    </View>
  )
}

const styles = StyleSheet.create({
  imgWrp: {},
  img: {},
  toBottom: {
    marginTop: 'auto',
  },
})

export default SliderItem
