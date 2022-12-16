import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { links } from '../../navigation/links'
import GalleryScreen from './Screen.Gallery'
import GalleryFilterScreen from './Screen.GalleryFilter'

const Stack = createNativeStackNavigator()

export default function GalleryRouter() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={links.galleryMain} component={GalleryScreen} />
      <Stack.Screen
        name={links.galleryFilter}
        component={GalleryFilterScreen}
      />
    </Stack.Navigator>
  )
}
