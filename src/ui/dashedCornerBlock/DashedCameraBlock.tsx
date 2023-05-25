import React from 'react'
import CameraIcon from '../icons/Icon.Camera'
import DashedCornerBlock, { DashedCornerBlockProps } from './DashedCornerBlock'

type DashedCameraBlockProps = {
  iconColor?: string
} & DashedCornerBlockProps

const DashedCameraBlock = ({ iconColor, ...props }: DashedCameraBlockProps) => {
  return (
    <DashedCornerBlock {...props}>
      <CameraIcon color={iconColor} />
    </DashedCornerBlock>
  )
}

export default DashedCameraBlock
