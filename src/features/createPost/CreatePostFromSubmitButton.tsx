import React, { useEffect } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { useFormField } from '../../lib/models/form'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import PresetButton from '../../ui/buttons/PresetButton'
import { createPostFormModel } from './model'
import { createPostAds } from './model.ads'

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

  useEffect(() => {
    createPostAds.init()
  }, [])

  return (
    <PresetButton
      style={style}
      disabled={!isDocumentUploaded}
      onPress={async () => {
        try {
          await createPostFormModel.submit()
          navigate(links.home)
          createPostFormModel.reset()
        } catch {}
      }}
      label={text.submit}
    />
  )
}

export default CreatePostFromSubmitButton
