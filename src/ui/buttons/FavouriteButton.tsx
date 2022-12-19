import React from 'react'
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import FavouriteIcon from '../icons/Icon.Favourite'

type FavouriteButtonProps = {
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  color?: string
}

const FavouriteButton = ({ onPress, style, color }: FavouriteButtonProps) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <FavouriteIcon color={color} />
    </TouchableOpacity>
  )
}

export default FavouriteButton
