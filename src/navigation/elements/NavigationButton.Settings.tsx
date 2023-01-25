import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { useNavigate } from '..'
import SettingsIcon from '../../ui/icons/Icon.Settings'
import { links } from '../links'

type SettingsNavigateButtonProps = {
  iconColor?: string
  iconSize?: number
  style?: StyleProp<ViewStyle>
}

const SettingsNavigationButton = ({
  iconColor,
  iconSize = 24,
  style,
}: SettingsNavigateButtonProps) => {
  const navigate = useNavigate()

  return (
    <TouchableOpacity
      onPress={() => navigate(links.settingsStack)}
      activeOpacity={0.7}
      style={[styles.button, style]}
    >
      <SettingsIcon color={iconColor} size={iconSize} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'flex-end',
  },
})

export default SettingsNavigationButton
