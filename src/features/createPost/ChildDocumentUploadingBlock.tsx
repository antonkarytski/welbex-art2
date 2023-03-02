import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { useFormField } from '../../lib/models/form'
import { useText } from '../../translations/hook'
import BlockUploadFromCamera from '../imagePick/Block.UploadFromCamera'
import DocumentLoadedMessageBlock from './DocumentLoadedMessageBlock'
import { createPostFormModel } from './model'

type ChildDocumentUploadingBlockProps = {
  style?: StyleProp<ViewStyle>
}

const ChildDocumentUploadingBlock = ({
  style,
}: ChildDocumentUploadingBlockProps) => {
  const text = useText()
  const [isDocumentUploaded, setIsDocumentLoaded] = useFormField(
    createPostFormModel,
    createPostFormModel.fields.isChildDocumentLoaded
  )

  if (isDocumentUploaded) {
    return (
      <DocumentLoadedMessageBlock
        onPressRemove={() => setIsDocumentLoaded(false)}
        style={style}
      />
    )
  }

  return (
    <BlockUploadFromCamera style={style} label={text.uploadChildDocument} />
  )
}

export default ChildDocumentUploadingBlock
