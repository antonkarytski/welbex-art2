import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { links } from '../../navigation/links'
import Login from './Screen.Login'
import PasswordEnter from './Screen.PasswordEnter'
import PasswordRecover from './Screen.PasswordRecover'
import PhoneEnter from './Screen.PhoneEnter'
import SignUp from './Screen.SignUp'
import Verification from './Screen.Verification'

const Stack = createNativeStackNavigator()

export default function AuthScreenRouter() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={links.login} component={Login} />
      <Stack.Screen name={links.signUp} component={SignUp} />
      <Stack.Screen name={links.phoneEnter} component={PhoneEnter} />
      <Stack.Screen name={links.verification} component={Verification} />
      <Stack.Screen name={links.passwordEnter} component={PasswordEnter} />
      <Stack.Screen name={links.passwordRecover} component={PasswordRecover} />
    </Stack.Navigator>
  )
}
