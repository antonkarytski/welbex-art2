import React from 'react'
import GoogleIcon from '../icons/Icon.Google'
import IconButton from './IconButton'
import { IconButtonProps } from './types'

const GoogleButton = ({ label, onPress, style, preset }: IconButtonProps) => {
  return (
    <IconButton onPress={onPress} style={style} preset={preset} label={label}>
      <GoogleIcon size={24} style={style?.icon} />
    </IconButton>
  )
}

export default GoogleButton
