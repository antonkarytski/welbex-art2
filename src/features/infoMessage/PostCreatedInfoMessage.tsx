import React from 'react'
import { links } from '../../navigation/links'
import SuccessInfoMessage from './parts/SuccessInfoMessage'

type PostCreatedInfoMessageProps = {
  nextMonth?: boolean
}
const PostCreatedInfoMessage = ({ nextMonth }: PostCreatedInfoMessageProps) => {
  return (
    <SuccessInfoMessage
      buttonLabel={(t) => t.ok}
      onButtonPress={({ navigate }) => navigate(links.home)}
      title={(t) => `${t.done}!`}
      subTitle={(t) =>
        nextMonth ? t.postSentToModerationNextMonth : t.postSentToModeration
      }
    />
  )
}

export default PostCreatedInfoMessage
