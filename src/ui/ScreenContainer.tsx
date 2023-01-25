import React, { ReactNode } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

interface ScreenContainerProps {
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

const ScreenContainer = ({ children, style }: ScreenContainerProps) => {
  return <View style={[styles.container, style]}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexGrow: 1,
  },
})

export default ScreenContainer
