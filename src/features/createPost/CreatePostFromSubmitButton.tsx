import { useStore } from 'effector-react'
import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { IdentityDocumentStatus } from '../../api/parts/users/types.api'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import AsyncPresetButton from '../../ui/buttons/AsyncPresetButton'
import { InfoMessageType } from '../infoMessage/types'
import { useChildDocumentStatus } from '../profile/childDocument/hooks'
import { createPostFormModel } from './model'

type CreatePostFromSubmitButtonProps = {
  style?: StyleProp<ViewStyle>
}

const CreatePostFromSubmitButton = ({
  style,
}: CreatePostFromSubmitButtonProps) => {
  const text = useText()
  const navigate = useNavigate()
  const isLoading = useStore(createPostFormModel.submit.pending)
  const isDocumentUploaded = useChildDocumentStatus((status) => {
    return (
      status !== IdentityDocumentStatus.UNDETERMINED &&
      status !== IdentityDocumentStatus.REJECTED
    )
  })

  return (
    <AsyncPresetButton
      isLoading={isLoading}
      style={style}
      disabled={!isDocumentUploaded}
      onPress={async () => {
        try {
          await createPostFormModel.submit()
          navigate(links.infoMessage, { type: InfoMessageType.POST_CREATED })
          createPostFormModel.reset()
        } catch {}
      }}
      label={text.submit}
    />
  )
}

export default CreatePostFromSubmitButton
