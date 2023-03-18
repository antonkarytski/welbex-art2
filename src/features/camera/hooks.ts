import { NavigationProp, useNavigation } from '@react-navigation/native'
import { ImagePickerAsset } from 'expo-image-picker'
import { links } from '../../navigation/links'
import { ScreensProps } from '../../navigation/types.screenProps'
import { cameraPhotoToPickerAsset } from './helpers'
import { CameraTask, setCameraTask } from './model'
import { getCameraPermission } from './model.permissions'

export function useCameraNavigate(task: CameraTask) {
  const { navigate } = useNavigation<NavigationProp<ScreensProps>>()
  return () => {
    setCameraTask(task)
    getCameraPermission().then(() => {
      navigate(links.camera)
    })
  }
}

type TaskPresetProps = {
  onPick?: (assets: ImagePickerAsset[]) => void
}

export const singlePhotoTask = ({
  onPick,
}: TaskPresetProps = {}): CameraTask => ({
  onPhoto: (photo) => {
    onPick?.([cameraPhotoToPickerAsset(photo)])
    setCameraTask(null)
  },
})
