import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Loader, { LoaderStyles } from '../loaders/Loader'
import Button from './PresetButton'
import { PresetButtonStates } from './types'

type AsyncPresetButtonProps = {
  onPress: () => void
  isLoading: boolean
  label?: string
  preset?: PresetButtonStates
  style?: StyleProp<ViewStyle>
  loaderColor?: string
  loaderStyle?: LoaderStyles
}

const AsyncPresetButton = ({
  isLoading,
  onPress,
  label,
  preset,
  style,
  loaderColor,
  loaderStyle,
}: AsyncPresetButtonProps) => {
  return isLoading ? (
    <Button preset={preset} style={style}>
      <Loader color={loaderColor} size={21} style={loaderStyle} />
    </Button>
  ) : (
    <Button label={label} onPress={onPress} preset={preset} style={style} />
  )
}

export default AsyncPresetButton
