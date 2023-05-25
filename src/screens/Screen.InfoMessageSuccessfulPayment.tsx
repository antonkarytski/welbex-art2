import { useStore } from 'effector-react'
import React, { useEffect } from 'react'
import PaymentSuccessInfoMessage from '../features/infoMessage/PaymentSuccessInfoMessage'
import { selectedSubscriptionPlan } from '../features/subscription/plans/model'
import { updateSubscriptionStatus } from '../features/subscription/request'
import { noop } from '../lib/helpers'
import { links } from '../navigation/links'
import { ScreenComponentProps } from '../navigation/types.screenProps'

const SuccessfulPaymentInfoMessageScreen = ({
  route,
}: ScreenComponentProps<links.successfulPaymentInfoMessage>) => {
  const selectedPlan = useStore(selectedSubscriptionPlan.$state)

  useEffect(() => {
    updateSubscriptionStatus().catch(noop)
  }, [])

  return (
    <PaymentSuccessInfoMessage
      duration={route.params.duration || selectedPlan?.duration}
    />
  )
}

export default SuccessfulPaymentInfoMessageScreen
