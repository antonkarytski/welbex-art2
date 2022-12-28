import { SaveFormat, manipulateAsync } from 'expo-image-manipulator'
import { getImageSize, getScaledSize } from '../helpers'

export function createResizeMiddleware(bigSide = 1280) {
  return async function (source: string) {
    const originalSize = await getImageSize(source)
    const resize = getScaledSize(originalSize, bigSide)
    const { uri } = await manipulateAsync(source, [{ resize }], {
      compress: 0.8,
      format: SaveFormat.JPEG,
    })
    return uri
  }
}

export const resizeMiddlewarePreset = [createResizeMiddleware()]
export const bigResizeMiddlewarePreset = [createResizeMiddleware(2560)]
