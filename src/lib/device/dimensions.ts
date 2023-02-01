import { Dimensions } from 'react-native'

export const screenHeight = Dimensions.get('screen').height
export const screenWidth = Dimensions.get('screen').width
export const ratioOfScreenHeightToWidth = screenHeight / screenWidth

type GetSizeProps = {
  measureName?: 'width' | 'height'
  paddingSize?: number
  percentOfScreenSize?: number
}

export const getSize = ({
  measureName = 'width',
  paddingSize = 20,
  percentOfScreenSize,
}: GetSizeProps) => {
  const screenSize = Dimensions.get('screen')[measureName]
  return percentOfScreenSize
    ? Math.floor(((screenSize - paddingSize * 2) / 100) * percentOfScreenSize)
    : Math.floor(screenSize - paddingSize * 2)
}
