import React from 'react'
import Loader, { LoaderStyles } from '../loaders/Loader'
import Button from './PresetButton'
import { PresetButtonProps } from './types'

type AsyncPresetButtonProps = {
  isLoading: boolean
  loaderColor?: string
  loaderStyle?: LoaderStyles
  loaderSize?: number
} & PresetButtonProps

const AsyncPresetButton = ({
  isLoading,
  onPress,
  label,
  preset,
  style,
  loaderColor,
  loaderStyle,
  loaderSize = 21,
  ...props
}: AsyncPresetButtonProps) => {
  if (isLoading)
    return (
      <Button preset={preset} style={style}>
        <Loader color={loaderColor} size={loaderSize} style={loaderStyle} />
      </Button>
    )
  return (
    <Button
      label={label}
      onPress={onPress}
      preset={preset}
      style={style}
      {...props}
    />
  )
}

export default AsyncPresetButton
