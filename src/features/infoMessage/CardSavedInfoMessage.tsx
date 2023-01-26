import React from 'react'
import { links } from '../../navigation/links'
import SuccessInfoMessage from './SuccessInfoMessage'
import { InfoMessageType } from './types'

type CardSavedInfoMessagesProps = {
  amountToPay: string
}

const CardSavedInfoMessage = ({ amountToPay }: CardSavedInfoMessagesProps) => {
  return (
    <SuccessInfoMessage
      buttonLabel={(t) => `${t.pay} $${amountToPay}`}
      onButtonPress={({ navigate }) =>
        navigate(links.infoMessage, {
          type: InfoMessageType.SUCCESSFUL_PAYMENT,
        })
      }
      title={(t) => t.cardSaved}
    />
  )
}

export default CardSavedInfoMessage
