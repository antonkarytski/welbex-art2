import { attach, createEffect, createEvent, createStore } from 'effector'
import * as ImagePicker from 'expo-image-picker'

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
    const savedPermission = await ImagePicker.getMediaLibraryPermissionsAsync()
    if (savedPermission.status === 'granted') {
      setMediaLibraryPermission()
      return true
    }
    const requestedPermission =
      await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (requestedPermission.status !== 'denied') {
      setMediaLibraryPermission()
      return true
    }
    return false
  }),
})

export const setCameraPermission = createEvent()
export const $cameraPermission = createStore(false).on(
  setCameraPermission,
  () => true
)
