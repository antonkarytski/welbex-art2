import { useStore } from 'effector-react'
import React, { useEffect } from 'react'
import { $isAuth } from '../features/auth/model'
import { useNavigate } from '../navigation'
import StackNavigator, { Stack } from '../navigation/elements/StackNavigator'
import { links } from '../navigation/links'
import ScreenInfoMessage from './Screen.InfoMessage'
import UserProfileScreen from './Screen.UserProfile'
import MainTabsRouter from './Tabs.Main'
import AuthScreenRouter from './auth/Router.Auth'
import EditProfileScreen from './profile/Screen.EditProfile'
import SettingsStack from './settings/Router.Settings'
import AddPaymentCardScreen from './subscription/Screen.AddPaymentCard'
import CurrentSubscriptionScreen from './subscription/Screen.CurrentSubscription'
import PaymentMethodsScreen from './subscription/Screen.PaymentMethods'
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
      <Stack.Screen
        name={links.addPaymentCard}
        component={AddPaymentCardScreen}
      />
      <Stack.Screen
        name={links.paymentMethod}
        component={PaymentMethodsScreen}
      />
      <Stack.Screen name={links.settingsStack} component={SettingsStack} />
      <Stack.Screen name={links.infoMessage} component={ScreenInfoMessage} />
    </StackNavigator>
  )
})

export default Router
