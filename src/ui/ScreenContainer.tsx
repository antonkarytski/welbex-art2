import React, { ReactNode } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

interface ScreenContainerProps {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  backgroundColor?: string
}

const ScreenContainer = ({
  children,
  style,
  backgroundColor,
}: ScreenContainerProps) => {
  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexGrow: 1,
  },
})

export default ScreenContainer
