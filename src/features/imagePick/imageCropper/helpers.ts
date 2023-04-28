import { ImagePickerAsset } from 'expo-image-picker'
import { IS_IOS } from '../../../lib/helpers/native/constants'

export const convertToFile = (asset: ImagePickerAsset): ImagePickerAsset => {
  if (IS_IOS) return asset
  return { ...asset, uri: 'file://' + asset.uri }
}
