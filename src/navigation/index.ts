import { NavigationProp, useNavigation } from '@react-navigation/native'
import { getCameraPermission } from '../features/camera/model.permissions'
import { links } from './links'
import { ScreensProps } from './types.screenProps'

export function useNavigate() {
  const { navigate } = useNavigation<NavigationProp<ScreensProps>>()
  return navigate
}

export function useCameraNavigate() {
  const { navigate } = useNavigation<NavigationProp<ScreensProps>>()
  return function () {
    getCameraPermission().then(() => {
      navigate(links.camera)
    })
  }
}
