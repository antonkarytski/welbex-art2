import React from 'react'
import { Stack } from '../../navigation/elements/StackNavigator'
import TabStackNavigator from '../../navigation/elements/TabStackNavigator'
import { createTabScreenDescription } from '../../navigation/helpers'
import { links } from '../../navigation/links'
import GalleryIcon from '../../ui/icons/Icon.Image'
import GalleriesTabsScreen from './Screen.GalleriesTabs'

const GalleryTabScreen = () => {
  return (
    <TabStackNavigator initialRoute={links.galleryMain}>
      <Stack.Screen name={links.galleryMain} component={GalleriesTabsScreen} />
    </TabStackNavigator>
  )
}

export const galleryTabDescription = createTabScreenDescription({
  Icon: GalleryIcon,
  Component: GalleryTabScreen,
  link: links.galleryTab,
  label: (t) => t.gallery,
})
