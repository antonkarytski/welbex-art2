import React, { ReactNode } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

interface ScreenWrapperProps {
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

const ScreenWrapper = ({ children, style }: ScreenWrapperProps) => {
  return <View style={[styles.wrapper, style]}>{children}</View>
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    height: '100%',
  },
})

export default ScreenWrapper
