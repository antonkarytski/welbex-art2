import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Fn } from '../../types'
import EyeIcon from '../icons/Icon.Eye'
import EyeClosedIcon from '../icons/Icon.EyeClosed'

export type ToggleHidingButtonProps = {
  secure: boolean
  onPress: Fn
  color?: string
  size?: number
}

const ToggleHidingButton = ({
  secure,
  onPress,
  color = '#303535',
  size = 24,
}: ToggleHidingButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      {secure ? (
        <EyeClosedIcon color={color} size={size} />
      ) : (
        <EyeIcon color={color} size={size} />
      )}
    </TouchableOpacity>
  )
}

export default ToggleHidingButton
