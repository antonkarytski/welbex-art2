import React from 'react'
import { StyleSheet } from 'react-native'
import DeleteIcon from '../../ui/icons/Icon.Delete'
import { links } from '../links'
import NavigationButton, { NavigateButtonProps } from './NavigationButton'

const DeleteNavigationButton = <L extends links>({
  style,
  ...props
}: NavigateButtonProps<L>) => {
  return (
    <NavigationButton
      Icon={DeleteIcon}
      style={[styles.button, style]}
      {...(props as any)}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'flex-end',
  },
})

export default DeleteNavigationButton
