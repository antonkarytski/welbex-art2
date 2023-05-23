import React from 'react'
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import CameraIcon from './icons/Icon.Camera'

type DashedCameraBlockProps = {
  style?: StyleProp<ViewStyle>
  backgroundColor?: ColorValue
  iconColor?: string
  borderColor?: string
  borderWidth?: number
  size?: number
  crossSize?: number
}

const DashedCameraBlock = ({
  style,
  borderColor,
  iconColor,
  borderWidth = 1,
  backgroundColor,
  size = 100,
  crossSize = 40,
}: DashedCameraBlockProps) => {
  const horizontalStyles: ViewStyle = {
    backgroundColor,
    width: size + borderWidth,
    height: crossSize,
    position: 'absolute',
    left: -borderWidth,
  }

  const verticalStyle: ViewStyle = {
    backgroundColor,
    width: crossSize,
    height: size + borderWidth,
    position: 'absolute',
    top: -borderWidth,
  }

  return (
    <View
      style={[
        styles.container,
        style,
        { borderWidth, borderColor, width: size, height: size },
      ]}
    >
      <View style={horizontalStyles} />
      <View style={verticalStyle} />
      <CameraIcon color={iconColor} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderStyle: 'solid',
  },
  cross: {
    position: 'absolute',
  },
})

export default DashedCameraBlock
