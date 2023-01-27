import React from 'react'
import SuccessInfoMessage from './SuccessInfoMessage'

type SignedOffInfoMessageProps = {
  subscriptionExpiresIn: string
}

const SignedOffInfoMessage = ({
  subscriptionExpiresIn,
}: SignedOffInfoMessageProps) => {
  return (
    <SuccessInfoMessage
      buttonLabel={(t) => t.ok}
      onButtonPress={({ goBack }) => goBack()}
      title={(t) => t.successfullySignedOff}
      subTitle={(t) => `${t.subscriptionEndMessage} ${subscriptionExpiresIn}`}
    />
  )
}

export default SignedOffInfoMessage
