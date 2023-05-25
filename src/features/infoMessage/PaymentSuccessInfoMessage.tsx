import React from 'react'
import { links } from '../../navigation/links'
import { getSubscriptionMonthsAmountText } from '../subscription/plans/helpers'
import SuccessInfoMessage from './parts/SuccessInfoMessage'

type PaymentSuccessInfoMessageProps = {
  subscriptionMonthsAmount: number | string
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
        `${
          t.subscribedFor
        } ${subscriptionMonthsAmount} ${getSubscriptionMonthsAmountText(
          +subscriptionMonthsAmount,
          t
        )}`
      }
    />
  )
}

export default PaymentSuccessInfoMessage
