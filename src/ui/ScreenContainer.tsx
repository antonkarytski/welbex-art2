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
  offBounces?: boolean
}

const ScreenContainer = ({
  children,
  style,
  backgroundColor,
  enableScrollView,
  offBounces,
}: ScreenContainerProps) => {
  const containerStyles = [
    styles.scrollViewContainer,
    !enableScrollView && styles.container,
    { backgroundColor },
    style,
  ]

  return enableScrollView ? (
    <ScrollView bounces={!offBounces} contentContainerStyle={containerStyles}>
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
    flex: 1,
  },
  scrollViewContainer: {
    paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
    flexGrow: 1,
    paddingBottom: 45,
  },
  innerContainer: {
    flexGrow: 1,
  },
})

export default ScreenContainer
