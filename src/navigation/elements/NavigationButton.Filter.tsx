import React from 'react'
import { StyleSheet } from 'react-native'
import FilterIcon from '../../ui/icons/Icon.Filter'
import { links } from '../links'
import NavigationButton, { NavigateButtonProps } from './NavigationButton'

const FilterNavigationButton = ({
  iconColor,
  iconSize = 24,
  style,
}: NavigateButtonProps) => {
  return (
    <NavigationButton
      Icon={FilterIcon}
      style={[styles.button, style]}
      navigateTo={links.galleryFilter}
      iconColor={iconColor}
      iconSize={iconSize}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'flex-start',
  },
})

export default FilterNavigationButton
