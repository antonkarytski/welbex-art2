import React from 'react'
import { links } from '../../navigation/links'
import TrashImage from '../../ui/images/TrashImage'
import InfoMessage from './InfoMessage'

type CardDeletedInfoMessageProps = {}

const CardDeletedInfoMessage = ({}: CardDeletedInfoMessageProps) => {
  return (
    <InfoMessage
      buttonLabel={(t) => t.backToPaymentMethods}
      onButtonPress={({ navigate }) => navigate(links.paymentMethod)}
      Image={TrashImage}
      title={(t) => t.cardDeleted}
    />
  )
}

export default CardDeletedInfoMessage
