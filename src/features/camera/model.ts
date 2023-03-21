import { createEvent, restore } from 'effector'
import { PhotoFile } from 'react-native-vision-camera'

export type CameraTask = {
  onPhoto: (photo: PhotoFile) => void
}
export const setCameraTask = createEvent<CameraTask | null>()
export const $cameraTask = restore(setCameraTask, null)
