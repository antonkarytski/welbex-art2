import React from 'react'
import { links } from '../../navigation/links'
import { LangStructure } from '../../translations/types'
import PaymentErrorImage from '../../ui/images/PaymentErrorImage'
import InfoMessage from './parts/InfoMessage'

export enum PaymentErrorReason {
  BALANCE = 'balance',
}

type PaymentErrorInfoMessageProps = {
  reason: PaymentErrorReason
}

function getPaymentErrorMessage(
  reason: PaymentErrorReason,
  text: LangStructure
) {
  if (reason === PaymentErrorReason.BALANCE) {
    return text.checkBalance
  }
  return ''
}

const PaymentErrorInfoMessage = ({ reason }: PaymentErrorInfoMessageProps) => {
  return (
    <InfoMessage
      variant={'light'}
      Image={PaymentErrorImage}
      buttonLabel={(t) => t.tryAgain}
      //TODO: try again
      onButtonPress={({ navigate }) => navigate(links.home)}
      title={(t) => t.paymentError}
      subTitle={(t) => getPaymentErrorMessage(reason, t)}
    />
  )
}

export default PaymentErrorInfoMessage
