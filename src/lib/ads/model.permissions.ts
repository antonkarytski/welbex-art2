import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions'
import { createPermissionModel } from '../permissions/model'

export const iosAppTrackingTransparencyPermission = createPermissionModel({
  check: () => check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY),
  request: () => request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY),
  initialStatus: RESULTS.DENIED,
  grantedStatus: RESULTS.GRANTED,
})
