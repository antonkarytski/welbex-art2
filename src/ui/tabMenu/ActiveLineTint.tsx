import React from 'react'
import { Animated, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { animationInterpolate } from 'altek-toolkit'

type ActiveLineTintProps = {
  position: Animated.AnimatedInterpolation<number>
  width: number
  routesCount: number
  style?: StyleProp<ViewStyle>
  tintStyle?: StyleProp<ViewStyle>
}

const ActiveLineTint = ({
  position,
  width,
  routesCount,
  style,
  tintStyle,
}: ActiveLineTintProps) => {
  const tintAnimatedStyle = {
    width: width / routesCount,
    transform: [
      {
        translateX: animationInterpolate(
          position as Animated.Value,
          [0, routesCount - 1],
          [0, width - width / routesCount]
        ),
      },
    ],
  }

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={[styles.tint, tintStyle, tintAnimatedStyle]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 1,
    width: '100%',
  },
  tint: {
    left: 0,
    top: 0,
    position: 'absolute',
    height: 1,
  },
})

export default ActiveLineTint
