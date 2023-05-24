import { createEffect } from 'effector'
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker'
import { IS_ANDROID, IS_IOS } from '../../lib/helpers/native/constants'
import { runCropper } from './imageCropper/model'
import { mediaLibraryPermission } from './model.permissions'

type PickFromCameraRollProps = {
  selectionLimit?: number
}
export const pickFromCameraRoll = createEffect(
  async ({ selectionLimit = 1 }: PickFromCameraRollProps = {}) => {
    const isPermissionGranted = await mediaLibraryPermission.check()
    if (!isPermissionGranted) return
    const result = await launchImageLibraryAsync({
      allowsMultipleSelection: selectionLimit > 1,
      allowsEditing: IS_ANDROID,
      quality: 1,
      mediaTypes: MediaTypeOptions.Images,
      selectionLimit,
    })
    if (!result.canceled && result.assets) {
      if (IS_IOS) return runCropper(result.assets)
      return result.assets
    }
  }
)
