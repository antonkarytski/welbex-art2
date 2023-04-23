import {
  getMediaLibraryPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker'
import { PermissionStatus } from 'expo-modules-core/src/PermissionsInterface'
import { PERMISSIONS } from 'react-native-permissions'
import { createPermissionModel } from '../../lib/permissions/model'
import { createNativePermissionModel } from '../../lib/permissions/nativePermissions'

export const mediaLibraryPermission = createPermissionModel({
  check: getMediaLibraryPermissionsAsync,
  request: requestMediaLibraryPermissionsAsync,
  grantedStatus: ({ granted }) => granted,
  initialStatus: {
    status: PermissionStatus.UNDETERMINED,
    expires: 'never',
    granted: false,
    canAskAgain: true,
  },
})

export const writeExternalStoragePermission = createNativePermissionModel(
  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  () => ({
    title: 'Hello',
    message: 'Hello',
  })
)
