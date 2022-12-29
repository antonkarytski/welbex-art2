import { createEffect } from 'effector/effector.cjs'
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker'
import { getMediaLibraryPermission } from './model.permissions'

export const pickFromCameraRoll = createEffect(async () => {
  const isPermissionGranted = await getMediaLibraryPermission()
  if (!isPermissionGranted) return
  const result = await launchImageLibraryAsync({
    allowsEditing: true,
    quality: 1,
    mediaTypes: MediaTypeOptions.Images,
  })
  if (!result.canceled && result.assets) return result.assets
})
