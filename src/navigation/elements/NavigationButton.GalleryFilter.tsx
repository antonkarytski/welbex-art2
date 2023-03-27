import React from 'react'
import { StyleSheet } from 'react-native'
import FiltersIcon from '../../ui/icons/Icon.Filters'
import { links } from '../links'
import NavigationButton, {
  SpecificNavigateButtonProps,
} from './NavigationButton'

const GalleryFilterNavigationButton = ({
  iconColor,
  iconSize = 24,
  style,
}: SpecificNavigateButtonProps<links.galleryFilter>) => {
  return (
    <NavigationButton
      Icon={FiltersIcon}
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

export default GalleryFilterNavigationButton
