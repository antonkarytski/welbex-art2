import { createEffect } from 'effector/effector.cjs'
import {
  ImagePickerAsset,
  MediaTypeOptions,
  launchImageLibraryAsync,
} from 'expo-image-picker'
import { getMediaLibraryPermission } from './model.permissions'

export const pickFromCameraRoll = createEffect(async () => {
  const isPermissionGranted = await getMediaLibraryPermission()
  if (!isPermissionGranted) return
  const result = await launchImageLibraryAsync({
    allowsEditing: true,
    quality: 1,
    mediaTypes: MediaTypeOptions.Images,
  })
  if (!result.canceled) return result as ImagePickerAsset
})
