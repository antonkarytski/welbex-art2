import React from 'react'
import { StyleSheet } from 'react-native'
import FilterIcon from '../../ui/icons/Icon.Filter'
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

export default GalleryFilterNavigationButton
