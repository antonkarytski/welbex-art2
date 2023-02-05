import React, { ReactNode } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { WINDOW_HEIGHT } from '../lib/device/dimensions'

interface ScreenWrapperProps {
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

const ScreenWrapper = ({ children, style }: ScreenWrapperProps) => {
  return <View style={[styles.wrapper, style]}>{children}</View>
}

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 45,
    backgroundColor: '#ffffff',
    height: WINDOW_HEIGHT,
  },
})

export default ScreenWrapper
