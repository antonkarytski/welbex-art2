import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { links } from '../../navigation/links'
import EditProfileScreen from './Screen.EditProfile'
import ProfileScreen from './Screen.Profile'

const Stack = createNativeStackNavigator()

export default function ProfileRouter() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={links.profileMain} component={ProfileScreen} />
      <Stack.Screen name={links.editProfile} component={EditProfileScreen} />
    </Stack.Navigator>
  )
}
