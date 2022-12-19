import React from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import PresetButton from '../PresetButton'
import { PresetButtonStates } from '../types'

type SubscribeButtonProps = {
  onPress: () => void
  style?: ViewStyle
  theme: {
    preset: PresetButtonStates
    label: string
  }
}

const SubscribeButton = ({ onPress, style, theme }: SubscribeButtonProps) => {
  return (
    <PresetButton
      label={theme.label}
      style={[styles.button, style]}
      labelStyle={styles.label}
      onPress={onPress}
      preset={theme.preset}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    width: 'auto',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    lineHeight: 19.6,
  },
})

export default SubscribeButton
