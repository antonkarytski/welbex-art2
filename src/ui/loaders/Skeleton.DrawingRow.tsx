import { HStack, Skeleton } from 'native-base'
import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { SCREEN_WIDTH } from '../../lib/device/dimensions'
import {
  SCREEN_CONTENT_WIDTH,
  SCREEN_PADDING_HORIZONTAL,
} from '../../styles/constants'
import { ColorsProp } from './types'

type DrawingsRowSkeletonProps = {
  style?: StyleProp<ViewStyle>
} & ColorsProp

const DrawingsRowSkeleton = ({ colors, style }: DrawingsRowSkeletonProps) => {
  const drawingWidth = (SCREEN_WIDTH - SCREEN_PADDING_HORIZONTAL * 3) / 2
  const drawingProps = {
    style: {
      width: drawingWidth,
      height: drawingWidth,
    },
    rounded: 'xl',
    ...colors,
  }

  return (
    <HStack
      width={SCREEN_CONTENT_WIDTH}
      justifyContent={'space-between'}
      style={style}
    >
      <Skeleton {...drawingProps} />
      <Skeleton {...drawingProps} />
    </HStack>
  )
}

export default DrawingsRowSkeleton
