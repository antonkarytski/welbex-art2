import * as ImagePicker from 'expo-image-picker'
import {
  ImagePickerAsset,
  ImagePickerOptions,
} from 'expo-image-picker/src/ImagePicker.types'

export async function pickImage(
  props: Partial<ImagePickerOptions> = {
    allowsEditing: true,
    quality: 0.5,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
  }
) {
  try {
    const result = await ImagePicker.launchImageLibraryAsync(props)
    if (!result.cancelled) return result as ImagePickerAsset
  } catch {}
}
