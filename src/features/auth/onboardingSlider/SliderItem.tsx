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

const SliderItem = ({ item, style, text }: SliderItemProps) => {
  return (
    <View style={styles.container}>
      <View style={[style?.imgWrp]}>
        <Image style={[styles?.img, style?.img]} source={item.img} />
      </View>
      <Span label={item.description(text)} style={style?.caption} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  imgWrp: {},
  img: {},
  toBottom: {
    marginTop: 'auto',
  },
})

export default SliderItem
