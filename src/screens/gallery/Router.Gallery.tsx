import React from 'react'
import { GalleryIcon } from 'altek-ui'
import { Stack } from '../../navigation/elements/StackNavigator'
import TabStackNavigator from '../../navigation/elements/TabStackNavigator'
import { createTabScreenDescription } from '../../navigation/helpers'
import { links } from '../../navigation/links'
import DrawingDetailsScreen from '../Screen.DrawingDetails'
import GalleriesTabsScreen from './Screen.GalleriesTabs'
import GalleryFilterScreen from './Screen.GalleryFilter'

const GalleryTabScreen = () => {
  return (
    <TabStackNavigator initialRoute={links.galleryMain}>
      <Stack.Screen name={links.galleryMain} component={GalleriesTabsScreen} />
      <Stack.Screen
        name={links.galleryDrawingDetails}
        component={DrawingDetailsScreen}
      />
      <Stack.Screen
        name={links.galleryFilter}
        component={GalleryFilterScreen}
      />
    </TabStackNavigator>
  )
}

export const galleryTabDescription = createTabScreenDescription({
  Icon: GalleryIcon,
  Component: GalleryTabScreen,
  link: links.galleryTab,
  label: (t) => t.gallery,
})
