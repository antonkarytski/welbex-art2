import React from 'react'
import DeleteIcon from '../icons/Icon.Delete'
import IconButton from './IconButton'
import { IconButtonProps } from './types'

const DeleteButton = ({
  label,
  onPress,
  style,
  preset,
  iconColor,
}: IconButtonProps) => {
  return (
    <IconButton onPress={onPress} style={style} preset={preset} label={label}>
      <DeleteIcon size={24} style={style?.icon} color={iconColor} />
    </IconButton>
  )
}

export default DeleteButton
