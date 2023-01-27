import { Dimensions } from 'react-native'

type GetSizeProps = {
  measureName?: 'width' | 'height'
  paddingSize?: number
  ratioToScreenSize?: number
}

export const getSize = ({
  measureName = 'width',
  paddingSize = 20,
  ratioToScreenSize = 1,
}: GetSizeProps) => {
  const screenSize = Dimensions.get('screen')[measureName]
  return (screenSize - paddingSize * 2) / ratioToScreenSize
}
