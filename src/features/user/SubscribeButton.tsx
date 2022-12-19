import React from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import { useText } from '../../translations/hook'
import PresetButton from '../../ui/buttons/PresetButton'
import { themedButtonPreset } from '../../ui/buttons/styles'
import { useColorTheme } from '../themed'

type ButtonSubscribeProps = {
  onPress: () => void
  style?: ViewStyle
  isActive: boolean
}

const SubscribeButton = ({
  onPress,
  style,
  isActive = true,
}: ButtonSubscribeProps) => {
  const text = useText()
  const [theme] = useColorTheme()
  const presetsList = themedButtonPreset(theme)

  return (
    <PresetButton
      label={isActive ? text.follow : text.unfollow}
      style={[styles.button, style]}
      labelStyle={styles.label}
      onPress={onPress}
      preset={isActive ? presetsList.COMMON : presetsList?.WHITE}
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
