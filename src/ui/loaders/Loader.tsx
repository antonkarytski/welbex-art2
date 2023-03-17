import React, { useEffect, useRef } from 'react'
import {
  Animated,
  Easing,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import LoaderIcon from '../icons/Icon.Loader'

type LoaderProps = {
  size?: number
  color?: string
  style?: {
    container?: StyleProp<ViewStyle>
    icon?: StyleProp<ViewStyle>
  }
}

const Loader = ({ size = 20, color, style }: LoaderProps) => {
  const spinValue = useRef(new Animated.Value(0)).current
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start()
  }, [spinValue])

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.iconWrapper,
          {
            transform: [{ rotate: spin }],
            width: size,
            height: size,
          },
          style?.container,
        ]}
      >
        <LoaderIcon size={size} color={color} style={style?.icon} />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  iconWrapper: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Loader
