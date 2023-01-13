import { useStore } from 'effector-react'
import React, { useEffect } from 'react'
import { $isAuth } from '../features/authServices/model'
import { useNavigate } from '../navigation'
import StackNavigator, { Stack } from '../navigation/elements/StackNavigator'
import { links } from '../navigation/links'
import UserProfileScreen from './Screen.UserProfile'
import MainTabsRouter from './Tabs.Main'
import AuthScreenRouter from './auth/Router.Auth'
import EditProfileScreen from './profile/Screen.EditProfile'
import CurrentSubscriptionScreen from './subscription/Screen.CurrentSubscription'
import SelectSubscriptionPlanScreen from './subscription/Screen.SelectSubscriptionPlan'

const Router = React.memo(() => {
  const isAuth = useStore($isAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) return navigate(links.mainTabs)
    navigate(links.authRouter)
  }, [isAuth, navigate])

  return (
    <StackNavigator>
      {!isAuth && (
        <Stack.Screen name={links.authRouter} component={AuthScreenRouter} />
      )}
      <Stack.Screen name={links.mainTabs} component={MainTabsRouter} />
      <Stack.Screen name={links.editProfile} component={EditProfileScreen} />
      <Stack.Screen name={links.userProfile} component={UserProfileScreen} />
      <Stack.Screen
        name={links.subscriptionSelectPlan}
        component={SelectSubscriptionPlanScreen}
      />
      <Stack.Screen
        name={links.subscriptionCurrent}
        component={CurrentSubscriptionScreen}
      />
    </StackNavigator>
  )
})

export default Router
