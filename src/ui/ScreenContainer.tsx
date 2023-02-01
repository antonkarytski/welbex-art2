import React, { ReactNode } from 'react'
import {
  Keyboard,
  ScrollView,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'
import { SCREEN_PADDING_HORIZONTAL } from '../styles/constants'

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={containerStyles}>{children}</View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
    flexGrow: 1,
  },
  innerContainer: { height: '100%' },
})

export default ScreenContainer
