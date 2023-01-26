import React from 'react'
import { links } from '../../navigation/links'
import SuccessInfoMessage from './SuccessInfoMessage'

type PaymentSuccessInfoMessageProps = {
  subscriptionMonthsAmount: string
}

const PaymentSuccessInfoMessage = ({
  subscriptionMonthsAmount,
}: PaymentSuccessInfoMessageProps) => {
  return (
    <SuccessInfoMessage
      buttonLabel={(t) => t.home}
      onButtonPress={({ navigate }) => navigate(links.home)}
      title={(t) => t.successfulPayment}
      subTitle={(t) =>
        `${t.subscribedFor} ${subscriptionMonthsAmount} ${t.months}`
      }
    />
  )
}

export default PaymentSuccessInfoMessage
