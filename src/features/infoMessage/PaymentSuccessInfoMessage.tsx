import React from 'react'
import { links } from '../../navigation/links'
import { getSubscriptionMonthsAmountText } from '../subscription/plans/helpers'
import SuccessInfoMessage from './parts/SuccessInfoMessage'

type PaymentSuccessInfoMessageProps = {
  duration?: number | string
}

const PaymentSuccessInfoMessage = ({
  duration,
}: PaymentSuccessInfoMessageProps) => {
  return (
    <SuccessInfoMessage
      buttonLabel={(t) => t.home}
      onButtonPress={({ navigate }) => navigate(links.home)}
      title={(t) => t.thankYouForPayment}
      subTitle={(t) => {
        return t.itIsWaitingForApprovement
        // if (duration) {
        //   return `${
        //     t.subscribedFor
        //   } ${duration} ${getSubscriptionMonthsAmountText(+duration, t)}`
        // }
        // return ''
      }}
    />
  )
}

export default PaymentSuccessInfoMessage
