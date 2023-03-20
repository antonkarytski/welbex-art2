import { attach, createEffect, createEvent, restore } from 'effector'
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera'

const setCameraPermission = createEvent<CameraPermissionStatus>()
export const $cameraPermission = restore(setCameraPermission, 'not-determined')
export const $isCameraPermissionGranted = $cameraPermission.map(
  (status) => status === 'authorized'
)

const requestCameraPermission = createEffect(Camera.requestCameraPermission)
requestCameraPermission.done.watch(({ result }) => {
  setCameraPermission(result)
})

export const getIsCameraPermissionGranted = attach({
  source: $isCameraPermissionGranted,
  effect: createEffect(async (isGranted: boolean) => {
    return isGranted || (await requestCameraPermission()) === 'authorized'
  }),
})

export function initCameraPermission() {
  Camera.getCameraPermissionStatus().then(setCameraPermission)
}
