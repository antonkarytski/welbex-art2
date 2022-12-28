import { createEvent, createStore } from 'effector'

export const setMediaLibraryPermission = createEvent()
export const $mediaLibraryPermission = createStore(false).on(
  setMediaLibraryPermission,
  () => true
)

export const setCameraPermission = createEvent()
export const $cameraPermission = createStore(false).on(
  setCameraPermission,
  () => true
)
