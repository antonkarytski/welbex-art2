import { createEvent, createStore } from 'effector'
import { ImagePickerAsset } from 'expo-image-picker'

export const addSelectedImages = createEvent<ImagePickerAsset[]>()
export const $selectedFeedbackImages = createStore<ImagePickerAsset[]>([]).on(
  addSelectedImages,
  (state, images) => {
    return [...state, ...images]
  }
)
