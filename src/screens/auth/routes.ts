import { links } from '../../navigation/links'
import { RoutesList } from '../types'
import AuthSubmitScreen from './Screen.AuthSubmit'
import CountrySelectionScreen from './Screen.CountrySelection'
import NewPasswordScreen from './Screen.CreateNewPassword'
import CreatePasswordScreen from './Screen.CreatePassword'
import LoginScreen from './Screen.Login'
import PhoneEnterScreen from './Screen.PhoneEnter'
import RecoverPasswordScreen from './Screen.RecoverPassword'
import SignUpScreen from './Screen.SignUp'
import VerificationScreen from './Screen.Verification'
import OnBoardingScreen from './onboarding/Screen.Onboarding'
import PicassoQuoteScreen from './onboarding/Screen.PicassoQuote'

export const AUTH_ROUTES: RoutesList = [
  { name: links.onboardingPicassoQuote, component: PicassoQuoteScreen },
  { name: links.onboarding, component: OnBoardingScreen },
  { name: links.signUp, component: SignUpScreen },
  { name: links.countrySelection, component: CountrySelectionScreen },
  { name: links.login, component: LoginScreen },
  { name: links.phoneEnter, component: PhoneEnterScreen },
  { name: links.verification, component: VerificationScreen },
  { name: links.createPassword, component: CreatePasswordScreen },
  { name: links.recoverPassword, component: RecoverPasswordScreen },
  { name: links.createNewPassword, component: NewPasswordScreen },
  { name: links.authSubmit, component: AuthSubmitScreen },
]
