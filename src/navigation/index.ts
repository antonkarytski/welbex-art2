import { NavigationProp, useNavigation } from '@react-navigation/native'
import { ScreensProps } from './types.screenProps'

export function useNavigate() {
  const { navigate } = useNavigation<NavigationProp<ScreensProps>>()
  return navigate
}
