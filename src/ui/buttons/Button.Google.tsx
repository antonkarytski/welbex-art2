import React from 'react'
import GoogleIcon from '../icons/Icon.Google'
import BigIconButton from './BigIconButton'
import { BigIconButtonProps } from './types'

const GoogleButton = ({
  label,
  onPress,
  style,
  preset,
}: BigIconButtonProps) => {
  return (
    <BigIconButton
      onPress={onPress}
      style={style}
      preset={preset}
      label={label}
    >
      <GoogleIcon size={24} style={style?.icon} />
    </BigIconButton>
  )
}

export default GoogleButton
