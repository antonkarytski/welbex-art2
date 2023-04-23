import { PERMISSIONS } from 'react-native-permissions'
import { createNativePermissionModel } from '../permissions/nativePermissions'

export const iosAppTrackingTransparencyPermission = createNativePermissionModel(
  PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
  (t) => ({
    message: t.iosAppTransparencyMessage,
    title: t.iosAppTransparencyTitle,
  })
)
