import { ArrowUpIcon } from 'native-base'
import React from 'react'
import { Animated, StyleSheet, TouchableOpacity } from 'react-native'
import { animationInterpolate, useAnimatedModel } from 'altek-toolkit'
import { createThemedStyle } from '../../themed'
import { useTheme } from '../../themed/hooks'
import { attachMenuSendButton } from './model'

type AttachMenuSendButtonProps = {
  onPress: () => void
}

export default function AttachMenuSendButton({
  onPress,
}: AttachMenuSendButtonProps) {
  const { styles, colors } = useTheme(themedStyles)
  const { animatedValue } = useAnimatedModel(attachMenuSendButton)

  const confirmButtonsInterpolate = animationInterpolate(
    animatedValue,
    [0, 1],
    [350, 0]
  )

  const dynamicStyles = {
    confirmButtons: {
      transform: [{ translateY: confirmButtonsInterpolate }],
    },
  }

  return (
    <Animated.View style={[styles.container, dynamicStyles.confirmButtons]}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <ArrowUpIcon color={colors.textGrey} size={25} />
      </TouchableOpacity>
    </Animated.View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      width: 50,
      height: 50,
      borderRadius: 30,
      backgroundColor: colors.buttonBackground,
      right: 25,
      top: 20,
      zIndex: 100,
    },
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
)
