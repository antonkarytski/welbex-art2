import React, { ReactNode } from 'react'
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'

interface ScreenContainerProps {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  backgroundColor?: string
  enableScrollView?: boolean
}

const ScreenContainer = ({
  children,
  style,
  backgroundColor,
  enableScrollView,
}: ScreenContainerProps) => {
  const containerStyles = [styles.container, { backgroundColor }, style]

  return enableScrollView ? (
    <ScrollView contentContainerStyle={containerStyles}>
      <View style={styles.innerContainer}>{children}</View>
    </ScrollView>
  ) : (
    <View style={containerStyles}>{children}</View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  innerContainer: { height: '100%' },
})

export default ScreenContainer
