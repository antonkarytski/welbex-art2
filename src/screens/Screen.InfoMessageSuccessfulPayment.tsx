import { useStore } from 'effector-react'
import React, { useEffect, useRef, useState } from 'react'
import PaymentSuccessInfoMessage from '../features/infoMessage/PaymentSuccessInfoMessage'
import { selectedSubscriptionPlan } from '../features/subscription/plans/model'
import { updateSubscriptionStatus } from '../features/subscription/request'
import { noop } from '../lib/helpers'
import { useNavigate } from '../navigation'
import { links } from '../navigation/links'
import { ScreenComponentProps } from '../navigation/types.screenProps'

const SuccessfulPaymentInfoMessageScreen = ({
  route,
}: ScreenComponentProps<links.successfulPaymentInfoMessage>) => {
  const selectedPlan = useStore(selectedSubscriptionPlan.$state)
  const navigate = useNavigate()
  const [haveRequested, setHaveRequested] = useState(false)
  const [wasPaid, setWasPaid] = useState(false)

  useEffect(() => {
    updateSubscriptionStatus()
      .then((result) => {
        setWasPaid(!!result)
      })
      .catch(noop)
      .finally(() => {
        setHaveRequested(true)
      })
  }, [])

  useEffect(() => {
    if (!wasPaid && haveRequested) {
      navigate(links.subscriptionSelectPlan)
    }
  }, [wasPaid, haveRequested, navigate])

  if (!haveRequested || !wasPaid) return null

  return (
    <PaymentSuccessInfoMessage
      duration={route.params.duration || selectedPlan?.duration}
    />
  )
}

export default SuccessfulPaymentInfoMessageScreen
