import { PERMISSIONS } from 'react-native-permissions'
import { IS_IOS } from '../../lib/helpers/native/constants'
import { createNativePermissionModel } from '../../lib/permissions/nativePermissions'

const name = IS_IOS ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
export const cameraPermission = createNativePermissionModel(name, (t) => ({
  title: t.cameraPermissionTitle,
  message: t.cameraPermissionMessage,
}))
