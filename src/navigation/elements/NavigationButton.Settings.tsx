import React from 'react'
import { StyleSheet } from 'react-native'
import SettingsIcon from '../../ui/icons/Icon.Settings'
import { links } from '../links'
import NavigationButton, {
  SpecificNavigateButtonProps,
} from './NavigationButton'

const SettingsNavigationButton = ({
  iconColor,
  iconSize = 24,
  style,
}: SpecificNavigateButtonProps<links.settings>) => {
  return (
    <NavigationButton
      Icon={SettingsIcon}
      navigateTo={links.settings}
      iconColor={iconColor}
      iconSize={iconSize}
      style={[styles?.button, style]}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'flex-end',
  },
})

export default SettingsNavigationButton
