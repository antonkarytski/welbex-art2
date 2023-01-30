import React from 'react'
import { StyleSheet } from 'react-native'
import DeleteIcon from '../../ui/icons/Icon.Delete'
import { links } from '../links'
import NavigationButton, { NavigateButtonProps } from './NavigationButton'

type DeleteNavigationButtonProps = {
  navigateTo: links
} & NavigateButtonProps

const DeleteNavigationButton = ({
  navigateTo,
  iconColor,
  iconSize = 24,
  style,
}: DeleteNavigationButtonProps) => {
  return (
    <NavigationButton
      Icon={DeleteIcon}
      style={[styles.button, style]}
      navigateTo={navigateTo}
      iconColor={iconColor}
      iconSize={iconSize}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'flex-end',
  },
})

export default DeleteNavigationButton
