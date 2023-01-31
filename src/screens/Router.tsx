import { useStore } from 'effector-react'
import React, { useEffect } from 'react'
import { $isAuth } from '../features/auth/model'
import { useNavigate } from '../navigation'
import StackNavigator, { Stack } from '../navigation/elements/StackNavigator'
import { links } from '../navigation/links'
import ScreenInfoMessage from './Screen.InfoMessage'
import UserProfileScreen from './Screen.UserProfile'
import MainTabsRouter from './Tabs.Main'
// import AuthScreenRouter from './auth/Router.Auth'
import CountrySelectionScreen from './auth/Screen.CountrySelection'
import NewPasswordScreen from './auth/Screen.CreateNewPassword'
import CreatePasswordScreen from './auth/Screen.CreatePassword'
import LoginScreen from './auth/Screen.Login'
import PhoneEnterScreen from './auth/Screen.PhoneEnter'
import RecoverPasswordScreen from './auth/Screen.RecoverPassword'
import SignUpScreen from './auth/Screen.SignUp'
import VerificationScreen from './auth/Screen.Verification'
import OnBoardingScreen from './auth/onboarding/Screen.Onboarding'
import PicassoQuoteScreen from './auth/onboarding/Screen.PicassoQuote'
import GalleryFilterScreen from './gallery/Screen.GalleryFilter'
import EditProfileScreen from './profile/Screen.EditProfile'
import SettingsStack from './settings/Router.Settings'
import AddPaymentCardScreen from './subscription/Screen.AddPaymentCard'
import CurrentSubscriptionScreen from './subscription/Screen.CurrentSubscription'
import DeletePaymentCardScreen from './subscription/Screen.DeletePaymentCard'
import PaymentMethodsScreen from './subscription/Screen.PaymentMethods'
import SelectSubscriptionPlanScreen from './subscription/Screen.SelectSubscriptionPlan'

const Router = React.memo(() => {
  const isAuth = useStore($isAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) return navigate(links.mainTabs)
    // navigate(links.authRouter)
    navigate(links.onboarding)
  }, [isAuth, navigate])

  return (
    <StackNavigator>
      <Stack.Screen
        name={links.onboardingPicassoQuote}
        component={PicassoQuoteScreen}
      />
      <Stack.Screen name={links.onboarding} component={OnBoardingScreen} />
      <Stack.Screen name={links.signUp} component={SignUpScreen} />
      <Stack.Screen
        name={links.countrySelection}
        component={CountrySelectionScreen}
      />
      <Stack.Screen name={links.login} component={LoginScreen} />
      <Stack.Screen name={links.phoneEnter} component={PhoneEnterScreen} />
      <Stack.Screen name={links.verification} component={VerificationScreen} />
      <Stack.Screen
        name={links.createPassword}
        component={CreatePasswordScreen}
      />
      <Stack.Screen
        name={links.recoverPassword}
        component={RecoverPasswordScreen}
      />
      <Stack.Screen
        name={links.createNewPassword}
        component={NewPasswordScreen}
      />
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
      <Stack.Screen
        name={links.deletePaymentCard}
        component={DeletePaymentCardScreen}
      />
      <Stack.Screen name={links.settingsStack} component={SettingsStack} />
      <Stack.Screen
        name={links.galleryFilter}
        component={GalleryFilterScreen}
      />
      <Stack.Screen name={links.infoMessage} component={ScreenInfoMessage} />
    </StackNavigator>
  )
})

export default Router
