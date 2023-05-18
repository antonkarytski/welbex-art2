import { useStore } from 'effector-react'
import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { IdentityDocumentStatus } from '../../api/parts/users/types.api'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import AsyncPresetButton from '../../ui/buttons/AsyncPresetButton'
import { PresetButtonStates } from '../../ui/buttons/types'
import { InfoMessageType } from '../infoMessage/types'
import { useChildDocumentStatus } from '../profile/childDocument/hooks'
import { createPostFormModel } from './model'

type CreatePostFromSubmitButtonProps = {
  style?: StyleProp<ViewStyle>
  preset?: PresetButtonStates
}

const CreatePostFromSubmitButton = ({
  style,
  preset,
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
          const nextMonth = createPostFormModel.getField('nextMonth')
          navigate(links.infoMessage, {
            type: InfoMessageType.POST_CREATED,
            payload: { nextMonth },
          })
          createPostFormModel.reset()
        } catch {}
      }}
      preset={preset}
      label={text.submit}
    />
  )
}

export default CreatePostFromSubmitButton
