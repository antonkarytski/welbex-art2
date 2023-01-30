import React from 'react'
import OutComingArrowIcon from '../icons/Icon.OutcomingArrow'
import BigIconButton from './BigIconButton'
import { BigIconButtonProps } from './types'

const LogoutButton = ({
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
      <OutComingArrowIcon size={24} style={style?.icon} />
    </BigIconButton>
  )
}

export default LogoutButton
