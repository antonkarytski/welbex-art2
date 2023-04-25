import { createEffect } from 'effector'
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker'
import { IS_ANDROID, IS_IOS } from '../../lib/helpers/native/constants'
import {
  ImageCropResultErrorCode,
  runImageCropperWithTask,
} from './imageCropper/model'
import { mediaLibraryPermission } from './model.permissions'

export const pickFromCameraRoll = createEffect(async () => {
  const isPermissionGranted = await mediaLibraryPermission.check()
  if (!isPermissionGranted) return
  const result = await launchImageLibraryAsync({
    allowsMultipleSelection: false,
    allowsEditing: IS_ANDROID,
    quality: 1,
    mediaTypes: MediaTypeOptions.Images,
  })
  if (!result.canceled && result.assets) {
    if (IS_IOS) {
      return runImageCropperWithTask({ asset: result.assets[0] })
        .then((asset) => [asset])
        .catch((error) => {
          if (error.message === ImageCropResultErrorCode.CANCELED_EDIT) {
            return result.assets
          }
          if (error.message === ImageCropResultErrorCode.CANCELED_PICK) {
            return
          }
        })
    }
    return result.assets
  }
})
