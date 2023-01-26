import React from 'react'
import { links } from '../../navigation/links'
import SuccessInfoMessage from './SuccessInfoMessage'

type CardSavedInfoMessagesProps = {
  amountToPay: string
}

const CardSavedInfoMessage = ({ amountToPay }: CardSavedInfoMessagesProps) => {
  return (
    <SuccessInfoMessage
      buttonLabel={(t) => `${t.pay} $${amountToPay}`}
      //TODO: pay
      onButtonPress={({ navigate }) => navigate(links.home)}
      title={(t) => t.cardSaved}
    />
  )
}

export default CardSavedInfoMessage
