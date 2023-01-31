import React from 'react'
import { StyleSheet } from 'react-native'
import DeleteIcon from '../../ui/icons/Icon.Delete'
import { links } from '../links'
import NavigationButton, { NavigateButtonProps } from './NavigationButton'

const DeleteNavigationButton = <L extends links>({
  navigateTo,
  iconColor,
  iconSize = 24,
  style,
  navigateParams,
}: NavigateButtonProps<L>) => {
  return (
    <NavigationButton
      Icon={DeleteIcon}
      style={[styles.button, style]}
      navigateTo={navigateTo}
      iconColor={iconColor}
      iconSize={iconSize}
      navigateParams={navigateParams}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'flex-end',
  },
})

export default DeleteNavigationButton
