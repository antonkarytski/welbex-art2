import React from 'react'
import DeleteIcon from '../icons/Icon.Delete'
import BigIconButton from './BigIconButton'
import { BigIconButtonProps } from './types'

const DeleteButton = ({
  label,
  onPress,
  style,
  preset,
  iconColor,
}: BigIconButtonProps) => {
  return (
    <BigIconButton
      onPress={onPress}
      style={style}
      preset={preset}
      label={label}
    >
      <DeleteIcon size={24} style={style?.icon} color={iconColor} />
    </BigIconButton>
  )
}

export default DeleteButton
