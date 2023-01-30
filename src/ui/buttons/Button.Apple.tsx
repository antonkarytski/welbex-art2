import React from 'react'
import AppleIcon from '../icons/Icon.Apple'
import BigIconButton from './BigIconButton'
import { BigIconButtonProps } from './types'

const AppleButton = ({
  label,
  onPress,
  style,
  preset,
  disabled,
}: BigIconButtonProps) => {
  return (
    <BigIconButton
      onPress={onPress}
      style={style}
      preset={preset}
      disabled={disabled}
      label={label}
    >
      <AppleIcon size={24} style={style?.icon} />
    </BigIconButton>
  )
}

export default AppleButton
