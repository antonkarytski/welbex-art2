import {
  PermissionStatus,
  getMediaLibraryPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker'
import { createPermissionModel } from '../../lib/permissions/model'

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
