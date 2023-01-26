import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { useNavigate } from '..'
import { links } from '../links'

export type NavigateButtonProps = {
  iconColor?: string
  iconSize?: number
  style?: StyleProp<ViewStyle>
}

type NavigateBaseButtonProps = NavigateButtonProps & {
  Icon: React.ComponentType<any>
  navigateTo: links
}

const NavigationButton = ({
  iconColor,
  iconSize = 24,
  style,
  Icon,
  navigateTo,
}: NavigateBaseButtonProps) => {
  const navigate = useNavigate()

  return (
    <TouchableOpacity
      onPress={() => navigate(navigateTo)}
      activeOpacity={0.6}
      style={[styles.button, style]}
    >
      <Icon color={iconColor} size={iconSize} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
})

export default NavigationButton
