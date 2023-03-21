import { useStore } from 'effector-react'
import React, { useEffect } from 'react'
import { $isAuth } from '../features/auth/model'
import { useNavigate } from '../navigation'
import StackNavigator, { Stack } from '../navigation/elements/StackNavigator'
import { links } from '../navigation/links'
import CameraScreen from './Screen.Camera'
import ScreenInfoMessage from './Screen.InfoMessage'
import UserProfileScreen from './Screen.UserProfile'
import MainTabsRouter from './Tabs.Main'
import { AUTH_ROUTES } from './auth/routes'
import GalleryFilterScreen from './gallery/Screen.GalleryFilter'
import EditProfileScreen from './profile/Screen.EditProfile'
import { SETTINGS_ROUTES } from './settings/routes'
import { SUBSCRIPTION_ROUTES } from './subscription/routes'

const ROUTES = [...AUTH_ROUTES, ...SETTINGS_ROUTES, ...SUBSCRIPTION_ROUTES]

const Router = React.memo(() => {
  const isAuth = useStore($isAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) return navigate(links.mainTabs)
    navigate(links.onboardingPicassoQuote)
  }, [isAuth, navigate])

  return (
    <StackNavigator>
      {ROUTES.map(({ name, component }) => (
        //@ts-ignore
        <Stack.Screen key={name} name={name} component={component} />
      ))}
      <Stack.Screen name={links.mainTabs} component={MainTabsRouter} />
      <Stack.Screen name={links.editProfile} component={EditProfileScreen} />
      <Stack.Screen name={links.camera} component={CameraScreen} />
      <Stack.Screen name={links.userProfile} component={UserProfileScreen} />
      <Stack.Screen
        name={links.galleryFilter}
        component={GalleryFilterScreen}
      />
      <Stack.Screen name={links.infoMessage} component={ScreenInfoMessage} />
    </StackNavigator>
  )
})

export default Router
