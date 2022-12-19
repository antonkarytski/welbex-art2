import React from 'react'
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import ShareIcon from '../icons/Icon.Share'

type ShareButtonProps = {
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  color?: string
}

const ShareButton = ({ onPress, style, color }: ShareButtonProps) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <ShareIcon color={color} />
    </TouchableOpacity>
  )
}

export default ShareButton
