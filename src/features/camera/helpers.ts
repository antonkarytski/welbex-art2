import { ImagePickerAsset } from 'expo-image-picker'
import { PhotoFile } from 'react-native-vision-camera'

export function cameraPhotoToPickerAsset(photo: PhotoFile): ImagePickerAsset {
  return {
    uri: photo.path,
    type: 'image',
    exif: photo.metadata['{Exif}'],
    fileName: 'ART' + Date.now(),
    height: photo.height,
    width: photo.width,
  }
}
