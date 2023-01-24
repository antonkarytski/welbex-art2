import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { links } from '../navigation/links'
import { ScreensProps } from '../navigation/types.screenProps'

const ScreenResultMessage = ({}: NativeStackScreenProps<
  ScreensProps,
  links.drawingDetails | links.galleryDrawingDetails
>) => {
  return null
}

export default ScreenResultMessage
