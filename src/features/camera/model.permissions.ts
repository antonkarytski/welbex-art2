import { attach, createEffect, createEvent, restore } from 'effector'
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera'

const setCameraPermission = createEvent<CameraPermissionStatus>()
export const $cameraPermission = restore(setCameraPermission, 'not-determined')
export const $isCameraPermissionGranted = $cameraPermission.map(
  (status) => status === 'authorized'
)

export const getCameraPermission = attach({
  source: $cameraPermission,
  effect: createEffect(async (status: CameraPermissionStatus) => {
    if (status === 'authorized') return true
    const result = await Camera.requestCameraPermission()
    setCameraPermission(result)
    return result === 'authorized'
  }),
})

export function initCameraPermission() {
  Camera.getCameraPermissionStatus().then(setCameraPermission)
}
