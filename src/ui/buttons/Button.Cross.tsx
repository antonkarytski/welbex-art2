import React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import { FnExt } from '../../types'
import CrossIcon from '../icons/Icon.Cross';


type CrossButtonProps = {
  onPress: FnExt<GestureResponderEvent, void>
}

const CrossButton = ({ onPress }: CrossButtonProps) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <CrossIcon />
    </TouchableOpacity>
  )
}

export default CrossButton
