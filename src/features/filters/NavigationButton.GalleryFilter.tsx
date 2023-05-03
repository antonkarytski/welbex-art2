import React from 'react'
import { StyleSheet } from 'react-native'
import NavigationButton, {
  SpecificNavigateButtonProps,
} from '../../navigation/elements/NavigationButton'
import { links } from '../../navigation/links'
import FiltersIcon from '../../ui/icons/Icon.Filters'
import { ColorThemeStructure } from '../themed/theme'

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

export const galleryFilterButtonGenerator = (colors: ColorThemeStructure) => (
  <GalleryFilterNavigationButton iconColor={colors.appHeaderIconLight} />
)

const styles = StyleSheet.create({
  button: {
    alignItems: 'flex-start',
  },
})

export default GalleryFilterNavigationButton
