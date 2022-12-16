import { NavigationProp, useNavigation } from '@react-navigation/native'
import { TScreensProps } from './types.screenProps'

export function useNavigate() {
  const { navigate } = useNavigation<NavigationProp<TScreensProps>>()
  return navigate
}
