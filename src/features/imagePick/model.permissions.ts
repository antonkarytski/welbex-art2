import { attach, createEffect, createEvent, createStore } from 'effector'
import {
  getMediaLibraryPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker'
import { PermissionStatus } from 'expo-modules-core/src/PermissionsInterface'
import { createPermissionModel } from '../../lib/permissions/model'

const mediaLibraryPermission = createPermissionModel({
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

export const setMediaLibraryPermission = createEvent()
export const $mediaLibraryPermission = createStore(false).on(
  setMediaLibraryPermission,
  () => true
)

export const getMediaLibraryPermission = attach({
  source: $mediaLibraryPermission,
  mapParams: (_: void, isGranted) => isGranted,
  effect: createEffect(async (isGranted: boolean) => {
    if (isGranted) return isGranted
    const savedPermission = await getMediaLibraryPermissionsAsync()
    if (savedPermission.status === 'granted') {
      setMediaLibraryPermission()
      return true
    }
    const requestedPermission = await requestMediaLibraryPermissionsAsync()
    if (requestedPermission.status !== 'denied') {
      setMediaLibraryPermission()
      return true
    }
    return false
  }),
})
