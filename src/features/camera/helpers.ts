import { ImagePickerAsset } from 'expo-image-picker'
import { PhotoFile } from 'react-native-vision-camera'

export const prepareCameraPhotoPath = (path: string) => {
  if (path.startsWith('file')) return path
  return 'file://' + path
}
export function cameraPhotoToPickerAsset(photo: PhotoFile): ImagePickerAsset {
  const ext = photo.path.split('.').pop()
  return {
    uri: prepareCameraPhotoPath(photo.path),
    type: 'image',
    exif: photo.metadata['{Exif}'],
    fileName: `art${Date.now()}.${ext}`,
    height: photo.height,
    width: photo.width,
  }
}
