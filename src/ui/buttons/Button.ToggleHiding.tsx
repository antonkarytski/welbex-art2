import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Fn } from '../../types'
import EyeIcon from '../icons/Icon.Eye'
import EyeClosedIcon from '../icons/Icon.EyeClosed'

export type ToggleHidingButtonProps = {
  isHidden: boolean
  onPress: Fn
  color?: string
  size?: number
}

const ToggleHidingButton = ({
  isHidden,
  onPress,
  color = '#303535',
  size = 24,
}: ToggleHidingButtonProps) => {
  const Icon = isHidden ? EyeClosedIcon : EyeIcon
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <Icon color={color} size={size} />
    </TouchableOpacity>
  )
}

export default ToggleHidingButton
