import React, { PropsWithChildren } from 'react'
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'

export type DashedCornerBlockProps = {
  style?: StyleProp<ViewStyle>
  backgroundColor?: ColorValue
  borderColor?: string
  borderWidth?: number
  size?: number
  crossSize?: number
  borderRadius?: number
}

const DashedCornerBlock = ({
  children,
  style,
  borderColor,
  borderWidth = 1,
  backgroundColor,
  size = 100,
  crossSize = 40,
}: PropsWithChildren<DashedCornerBlockProps>) => {
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
        { borderWidth, borderColor, width: size, height: size },
        style,
      ]}
    >
      <View style={horizontalStyles} />
      <View style={verticalStyle} />
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderStyle: 'solid',
  },
  cross: {
    position: 'absolute',
  },
})

export default DashedCornerBlock
