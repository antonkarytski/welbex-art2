import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { links } from '../../navigation/links'
import AddPostDescriptionScreen from './Screen.AddPostDescription'
import UploadPostImageScreen from './Screen.UploadPostImage'

const Stack = createNativeStackNavigator()

export default function PostRouter() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={links.uploadPostImage}
        component={UploadPostImageScreen}
      />
      <Stack.Screen
        name={links.addPostDescription}
        component={AddPostDescriptionScreen}
      />
    </Stack.Navigator>
  )
}
