import React from 'react'
import { links } from '../../navigation/links'
import ConnectionErrorImage from '../../ui/images/ConnectionErrorImage'
import InfoMessage from './InfoMessage'

type ConnectionErrorInfoMessageProps = {}
const ConnectionErrorInfoMessage = ({}: ConnectionErrorInfoMessageProps) => {
  return (
    <InfoMessage
      variant={'light'}
      Image={ConnectionErrorImage}
      buttonLabel={(t) => t.update}
      onButtonPress={({ navigate }) => navigate(links.home)}
      title={(t) => t.connectionError}
      subTitle={(t) => t.checkConnection}
    />
  )
}

export default ConnectionErrorInfoMessage
