import React from 'react'
import Loader, { LoaderStyles } from '../loaders/Loader'
import Button from './PresetButton'
import { PresetButtonProps } from './types'

type AsyncPresetButtonProps = {
  isLoading: boolean
  loaderColor?: string
  loaderStyle?: LoaderStyles
} & PresetButtonProps

const AsyncPresetButton = ({
  isLoading,
  onPress,
  label,
  preset,
  style,
  loaderColor,
  loaderStyle,
}: AsyncPresetButtonProps) => {
  if (isLoading)
    return (
      <Button preset={preset} style={style}>
        <Loader color={loaderColor} size={21} style={loaderStyle} />
      </Button>
    )
  return (
    <Button label={label} onPress={onPress} preset={preset} style={style} />
  )
}

export default AsyncPresetButton
