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
    paddingBottom: 45,
    backgroundColor: '#ffffff',
    height: '100%',
  },
})

export default ScreenWrapper
