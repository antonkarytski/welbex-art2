import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { links } from '../../navigation/links'
import CategoryScreen from './Screen.CompetitionCategory'
import HomeScreen from './Screen.Home'

const Stack = createNativeStackNavigator()

export default function HomeRouter() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={links.homeMain} component={HomeScreen} />
      <Stack.Screen
        name={links.competitionCategory}
        component={CategoryScreen}
      />
    </Stack.Navigator>
  )
}
