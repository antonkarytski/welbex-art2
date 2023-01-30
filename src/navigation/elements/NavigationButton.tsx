import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { useNavigate } from '../index'
import { links } from '../links'
import { ScreensProps } from '../types.screenProps'

export type NavigateButtonProps<L extends keyof ScreensProps> = {
  iconColor?: string
  iconSize?: number
  style?: StyleProp<ViewStyle>
  navigateTo: L
  navigateParams?: ScreensProps[L]
}

export type SpecificNavigateButtonProps<L extends links> = Omit<
  NavigateButtonProps<L>,
  'navigateTo'
>

type NavigateBaseButtonProps<L extends links> = NavigateButtonProps<L> & {
  Icon: React.ComponentType<any>
}

const NavigationButton = <L extends links>({
  iconColor,
  iconSize = 24,
  style,
  Icon,
  navigateTo,
  navigateParams,
}: NavigateBaseButtonProps<L>) => {
  const navigate = useNavigate()

  return (
    <TouchableOpacity
      onPress={() => {
        //@ts-ignore
        navigate(navigateTo, navigateParams)
      }}
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
