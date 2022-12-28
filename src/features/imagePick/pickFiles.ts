import { createEffect } from 'effector/effector.cjs'
import * as ImagePicker from 'expo-image-picker'
import { ImagePickerAsset } from 'expo-image-picker/src/ImagePicker.types'
import { getMediaLibraryPermission } from './model.permissions'

export const pickFromCameraRoll = createEffect(async () => {
  const isPermissionGranted = await getMediaLibraryPermission()
  if (!isPermissionGranted) return
  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    quality: 1,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
  })
  if (!result.cancelled) return result as ImagePickerAsset
})
