import React from 'react'
import { links } from '../../navigation/links'
import SuccessInfoMessage from './parts/SuccessInfoMessage'

const FeedbackSuccessSentInfoMessage = () => {
  return (
    <SuccessInfoMessage
      buttonLabel={(t) => t.ok}
      onButtonPress={({ navigate }) => navigate(links.settings)}
      title={(t) => t.done}
      subTitle={(t) => t.feedbackForm.successMessageSent}
    />
  )
}

export default FeedbackSuccessSentInfoMessage
