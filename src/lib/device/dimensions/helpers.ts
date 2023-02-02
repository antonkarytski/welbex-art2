import { Dimensions } from 'react-native'

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
