import React from 'react'
import {
  GestureResponderEvent,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { FnExt } from '../../types'
import CrossIcon from '../icons/Icon.Cross'

type CrossButtonProps = {
  onPress: FnExt<GestureResponderEvent, void>
  style?: StyleProp<ViewStyle>
}

const CrossButton = ({ onPress, style }: CrossButtonProps) => {
  return (
    <TouchableOpacity style={style} activeOpacity={0.6} onPress={onPress}>
      <CrossIcon />
    </TouchableOpacity>
  )
}

export default CrossButton
