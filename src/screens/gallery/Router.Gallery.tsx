import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { GalleryIcon } from 'altek-ui'
import TabStackNavigator from '../../navigation/elements/TabStackNavigator'
import { createTabScreenDescription } from '../../navigation/helpers'
import { links } from '../../navigation/links'
import GalleryScreen from './Screen.Gallery'
import GalleryFilterScreen from './Screen.GalleryFilter'

const Stack = createNativeStackNavigator()

const GalleryTabScreen = () => {
  return (
    <TabStackNavigator initialRoute={links.galleryMain}>
      <Stack.Screen name={links.galleryMain} component={GalleryScreen} />
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
