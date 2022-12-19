import { useState } from 'react'
import { Dimensions } from 'react-native'
import { Size } from '../../types/units'

export function useImageAutoHeight(widthGenerator: () => number) {
  const [size, setSize] = useState<Size>(Dimensions.get('screen'))

  function load(imageSize: Size) {
    const width = widthGenerator()
    setSize({
      width,
      height: (imageSize.height / imageSize.width) * width,
    })
  }

  return [size, load] as [Size, (imageSize: Size) => void]
}
