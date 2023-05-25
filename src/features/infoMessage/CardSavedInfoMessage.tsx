import React from 'react'
import { links } from '../../navigation/links'
import { getFullPrice } from '../subscription/plans/helpers'
import { PlanDescriptor } from '../subscription/plans/types'
import SuccessInfoMessage from './parts/SuccessInfoMessage'
import { InfoMessageType } from './types'

type CardSavedInfoMessagesProps = {
  currentPayment?: PlanDescriptor
}

const CardSavedInfoMessage = ({
  currentPayment,
}: CardSavedInfoMessagesProps) => {
  return (
    <SuccessInfoMessage
      buttonLabel={(t) =>
        currentPayment
          ? `${t.pay} $${getFullPrice(currentPayment)}`
          : t.backToPaymentMethods
      }
      onButtonPress={({ navigate }) => {
        if (!currentPayment) {
          return navigate(links.paymentMethod)
        }
        navigate(links.infoMessage, {
          type: InfoMessageType.SUCCESSFUL_PAYMENT,
          payload: {
            currentPayment,
          },
        })
      }}
      title={(t) => t.cardSaved}
    />
  )
}

export default CardSavedInfoMessage
