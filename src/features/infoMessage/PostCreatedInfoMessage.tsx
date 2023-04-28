import React from 'react'
import { links } from '../../navigation/links'
import SuccessInfoMessage from './parts/SuccessInfoMessage'

const PostCreatedInfoMessage = () => {
  return (
    <SuccessInfoMessage
      buttonLabel={(t) => t.ok}
      onButtonPress={({ navigate }) => navigate(links.home)}
      title={(t) => `${t.done}!`}
      subTitle={(t) => t.postSentToModeration}
    />
  )
}

export default PostCreatedInfoMessage
