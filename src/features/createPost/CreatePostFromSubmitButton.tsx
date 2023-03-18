import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { noop } from '../../lib/helpers'
import { useFormField } from '../../lib/models/form'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import PresetButton from '../../ui/buttons/PresetButton'
import { createPostFormModel } from './model'

type CreatePostFromSubmitButtonProps = {
  style?: StyleProp<ViewStyle>
}

const CreatePostFromSubmitButton = ({
  style,
}: CreatePostFromSubmitButtonProps) => {
  const text = useText()
  const navigate = useNavigate()
  const [isDocumentUploaded] = useFormField(
    createPostFormModel,
    createPostFormModel.fields.isChildDocumentLoaded
  )

  return (
    <PresetButton
      style={style}
      disabled={!isDocumentUploaded}
      onPress={() => {
        createPostFormModel
          .submit()
          .then(() => {
            navigate(links.home)
            createPostFormModel.reset()
          })
          .catch(noop)
      }}
      label={text.submit}
    />
  )
}

export default CreatePostFromSubmitButton
