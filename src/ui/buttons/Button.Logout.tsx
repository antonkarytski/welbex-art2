import React from 'react'
import OutComingArrowIcon from '../icons/Icon.OutcomingArrow'
import IconButton from './IconButton'
import { IconButtonProps } from './types'

const LogoutButton = ({
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
      <OutComingArrowIcon size={24} style={style?.icon} />
    </IconButton>
  )
}

export default LogoutButton
