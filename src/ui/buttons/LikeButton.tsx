import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import Span from '../Span'
import HeartIcon from '../icons/Icon.Heart'

type LikeButtonProps = {
  onPress?: () => void
  likesCount: number
  color?: string
  style?: StyleProp<ViewStyle>
}

const LikeButton = ({ likesCount, onPress, color, style }: LikeButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <HeartIcon color={color} />
      <Span style={[styles.counter, { color }]} label={likesCount} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counter: {
    marginLeft: 10,
    fontSize: 16,
  },
})

export default LikeButton
