import { WINDOW_HEIGHT, WINDOW_WIDTH } from './constants'

type GetSizeProps = {
  paddingSize?: number
  percentOfScreenSize?: number
}

type CalculateSizeProps = {
  screenSize: number
  paddingSize?: number
  percentOfScreenSize?: number
}

const calculateSize = ({
  screenSize,
  paddingSize = 0,
  percentOfScreenSize,
}: CalculateSizeProps) => {
  return percentOfScreenSize
    ? Math.floor(((screenSize - paddingSize * 2) / 100) * percentOfScreenSize)
    : Math.floor(screenSize - paddingSize * 2)
}

export const getWidth = ({
  paddingSize = 20,
  percentOfScreenSize,
}: GetSizeProps) => {
  return calculateSize({
    paddingSize,
    percentOfScreenSize,
    screenSize: WINDOW_WIDTH,
  })
}

export const getHeight = ({
  paddingSize = 0,
  percentOfScreenSize,
}: GetSizeProps) => {
  return calculateSize({
    paddingSize,
    percentOfScreenSize,
    screenSize: WINDOW_HEIGHT,
  })
}
