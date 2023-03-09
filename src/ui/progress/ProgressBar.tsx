import React, { useEffect, useRef, useState } from 'react'
import { Animated, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { COMMON } from '../../styles/colors'

type ProgressBarProps = {
  color?: string
  barColor?: string
  style?: StyleProp<ViewStyle>
  barStyle?: StyleProp<ViewStyle>
  value?: Animated.Value | number
}

const ProgressBar = ({
  style,
  barStyle,
  color = COMMON.WHITE,
  barColor = COMMON.BLACK,
  value = 0,
}: ProgressBarProps) => {
  const [fullWidth, setFullWidth] = useState(0)
  const animatedValue = useRef(
    typeof value === 'number' ? new Animated.Value(value) : value
  ).current

  const progress = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-fullWidth, 0],
  })

  useEffect(() => {
    if (typeof value === 'number') {
      Animated.timing(animatedValue, {
        toValue: value,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
  }, [animatedValue, value])

  return (
    <View
      onLayout={({ nativeEvent }) => {
        setFullWidth(nativeEvent.layout.width)
      }}
      style={[styles.container, { backgroundColor: color }, style]}
    >
      <Animated.View
        style={[
          styles.bar,
          { backgroundColor: barColor },
          barStyle,
          { transform: [{ translateX: progress }] },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 4,
    borderRadius: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  bar: {
    borderRadius: 2,
    height: '100%',
    width: '100%',
    zIndex: -2,
    position: 'absolute',
  },
})

export default ProgressBar
