import { ImagePickerAsset } from 'expo-image-picker'
import { PhotoFile } from 'react-native-vision-camera'
import { IS_ANDROID } from '../../lib/helpers/native/constants'

export function cameraPhotoToPickerAsset(photo: PhotoFile): ImagePickerAsset {
  const ext = photo.path.split('.').pop()
  const uri = IS_ANDROID ? 'file://' + photo.path : photo.path
  return {
    uri,
    type: 'image',
    exif: photo.metadata['{Exif}'],
    fileName: `art${Date.now()}.${ext}`,
    height: photo.height,
    width: photo.width,
  }
}
