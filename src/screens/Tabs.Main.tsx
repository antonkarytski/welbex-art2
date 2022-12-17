import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { links } from '../navigation/links'
import CreatePostRouter from './createPost/Router.CreatePost'
import GalleryRouter from './gallery/Router.Gallery'
import HomeRouter from './home/Router.Home'
import ProfileRouter from './profile/Router.Profile'
import SettingsRouter from './settings/Router.Settings'

const BottomTab = createBottomTabNavigator()

export default React.memo(function MainRouter() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name={links.home} component={HomeRouter} />
      <BottomTab.Screen name={links.gallery} component={GalleryRouter} />
      <BottomTab.Screen name={links.createPost} component={CreatePostRouter} />
      <BottomTab.Screen name={links.profile} component={ProfileRouter} />
    </BottomTab.Navigator>
  )
})
