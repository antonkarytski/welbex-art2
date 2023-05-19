import React from 'react'
import { StyleSheet } from 'react-native'
import NavigationButton, {
  SpecificNavigateButtonProps,
} from '../../navigation/elements/NavigationButton'
import { links } from '../../navigation/links'
import { ScreensProps } from '../../navigation/types.screenProps'
import FiltersIcon from '../../ui/icons/Icon.Filters'
import { ColorThemeStructure } from '../themed/theme'

const GalleryFilterNavigationButton = ({
  style,
  ...props
}: SpecificNavigateButtonProps<links.galleryFilter>) => {
  return (
    <NavigationButton
      Icon={FiltersIcon}
      style={[styles.button, style]}
      navigateTo={links.galleryFilter}
      {...props}
    />
  )
}

export const setUpGalleryFilterButton = (
  color: string,
  params?: ScreensProps[links.galleryFilter]
) => <GalleryFilterNavigationButton iconColor={color} navigateParams={params} />

const styles = StyleSheet.create({
  button: {
    alignItems: 'flex-start',
  },
})

export default GalleryFilterNavigationButton
