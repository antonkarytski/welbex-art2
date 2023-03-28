import { Camera } from 'react-native-vision-camera'
import { createPermissionModel } from '../../lib/permissions/model'

export const cameraPermission = createPermissionModel({
  check: Camera.getCameraPermissionStatus,
  request: Camera.requestCameraPermission,
  initialStatus: 'not-determined',
  grantedStatus: 'authorized',
})
