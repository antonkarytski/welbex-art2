import React from 'react'
import SuccessImage from '../../ui/images/SuccessImage'
import InfoMessage, { InfoMessageProps } from './InfoMessage'

type SuccessInfoMessageProps = Omit<InfoMessageProps, 'Image'>

const SuccessInfoMessage = (props: SuccessInfoMessageProps) => {
  return <InfoMessage Image={SuccessImage} {...props} />
}

export default SuccessInfoMessage
