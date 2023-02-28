import React from 'react'
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import FavouriteIcon from '../icons/Icon.Favourite'

type FavouriteButtonProps = {
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  color?: string
  active?: boolean
}

const FavouriteButton = ({
  onPress,
  style,
  color,
  active,
}: FavouriteButtonProps) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <FavouriteIcon color={color} fill={active ? color : 'none'} />
    </TouchableOpacity>
  )
}

export default FavouriteButton
