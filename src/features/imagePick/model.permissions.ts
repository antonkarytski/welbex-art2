import { PERMISSIONS } from 'react-native-permissions'
import { IS_IOS } from '../../lib/helpers/native/constants'
import { createNativePermissionModel } from '../../lib/permissions/nativePermissions'

const name = IS_IOS
  ? PERMISSIONS.IOS.MEDIA_LIBRARY
  : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE

export const mediaLibraryPermission = createNativePermissionModel(
  name,
  (t) => ({
    title: t.mediaLibraryPermissionTitle,
    message: t.mediaLibraryPermissionMessage,
  })
)
