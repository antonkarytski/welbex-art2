import React from 'react'
import AppleIcon from '../icons/Icon.Apple'
import IconButton from './IconButton'
import { IconButtonProps } from './types'

const AppleButton = ({
  label,
  onPress,
  style,
  preset,
  disabled,
}: IconButtonProps) => {
  return (
    <IconButton
      onPress={onPress}
      style={style}
      preset={preset}
      disabled={disabled}
      label={label}
    >
      <AppleIcon size={24} style={style?.icon} />
    </IconButton>
  )
}

export default AppleButton
