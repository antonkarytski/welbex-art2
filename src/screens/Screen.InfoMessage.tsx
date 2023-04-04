import React from 'react'
import CardDeletedInfoMessage from '../features/infoMessage/CardDeletedInfoMessage'
import CardSavedInfoMessage from '../features/infoMessage/CardSavedInfoMessage'
import ConnectionErrorInfoMessage from '../features/infoMessage/ConnectionErrorInfoMessage'
import PaymentErrorInfoMessage, {
  PaymentErrorReason,
} from '../features/infoMessage/PaymentErrorInfoMessage'
import PaymentSuccessInfoMessage from '../features/infoMessage/PaymentSuccessInfoMessage'
import SignedOffInfoMessage from '../features/infoMessage/SignedOffInfoMessage'
import { InfoMessageType } from '../features/infoMessage/types'
import { links } from '../navigation/links'
import { ScreenComponentProps } from '../navigation/types.screenProps'

const InfoMessageScreen = ({
  route,
}: ScreenComponentProps<links.infoMessage>) => {
  const params = route.params
  if (params.type === InfoMessageType.CONNECTION_ERROR) {
    return <ConnectionErrorInfoMessage />
  }
  if (params.type === InfoMessageType.PAYMENT_ERROR) {
    return <PaymentErrorInfoMessage reason={PaymentErrorReason.BALANCE} />
  }
  if (params.type === InfoMessageType.CARD_SAVED) {
    return (
      <CardSavedInfoMessage currentPayment={params.payload?.currentPayment} />
    )
  }
  if (params.type === InfoMessageType.SUCCESSFUL_PAYMENT) {
    return (
      <PaymentSuccessInfoMessage
        subscriptionMonthsAmount={params.payload.months}
      />
    )
  }
  if (params.type === InfoMessageType.SIGNED_OFF) {
    return <SignedOffInfoMessage subscriptionExpiresIn={'01.01.2023'} />
  }
  if (params.type === InfoMessageType.CARD_DELETED) {
    return <CardDeletedInfoMessage />
  }
  return null
}

export default InfoMessageScreen
