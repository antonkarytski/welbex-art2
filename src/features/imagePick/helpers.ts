import { Image } from 'react-native'
import { Size } from '../../types/units'

export function getImageSize(
  url: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    Image.getSize(url, (width, height) => resolve({ width, height }), reject)
  })
}

export function getScaledSize(size: Size, controlSize: number) {
  const largerSize = Math.max(size.height, size.width, controlSize)
  return {
    width: Math.ceil((size.width / largerSize) * controlSize),
    height: Math.ceil((size.height / largerSize) * controlSize),
  }
}
