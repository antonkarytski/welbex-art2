import { useStore } from 'effector-react'
import React from 'react'
import PaymentSuccessInfoMessage from '../features/infoMessage/PaymentSuccessInfoMessage'
import { selectedSubscriptionPlan } from '../features/subscription/plans/model'
import { links } from '../navigation/links'
import { ScreenComponentProps } from '../navigation/types.screenProps'

const SuccessfulPaymentInfoMessageScreen = ({
  route,
}: ScreenComponentProps<links.successfulPaymentInfoMessage>) => {
  const selectedPlan = useStore(selectedSubscriptionPlan.$state)

  return (
    <PaymentSuccessInfoMessage
      duration={route.params.duration || selectedPlan?.duration}
    />
  )
}

export default SuccessfulPaymentInfoMessageScreen
