import { useStore } from 'effector-react'
import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { noop } from '../../lib/helpers'
import { useFormField } from '../../lib/models/form'
import { useText } from '../../translations/hook'
import BlockUploadFromCamera from '../imagePick/Block.UploadFromCamera'
import DocumentStatusMessageBlock from './DocumentStatusMessageBlock'
import { createPostFormModel } from './model'
import {
  $isChildDocumentOnLoading,
  childDocumentProgressAnimatedValue,
  uploadChildDocument,
} from './model.documentUploading'

type ChildDocumentUploadingBlockProps = {
  style?: StyleProp<ViewStyle>
}

const ChildDocumentUploadingBlock = ({
  style,
}: ChildDocumentUploadingBlockProps) => {
  const text = useText()
  const isOnLoading = useStore($isChildDocumentOnLoading)
  const [isDocumentUploaded, setIsDocumentLoaded] = useFormField(
    createPostFormModel,
    createPostFormModel.fields.isChildDocumentLoaded
  )

  if (isDocumentUploaded || isOnLoading) {
    return (
      <DocumentStatusMessageBlock
        progressValue={childDocumentProgressAnimatedValue}
        isOnLoading={isOnLoading}
        onPressRemove={() => setIsDocumentLoaded(false)}
        style={style}
      />
    )
  }

  return (
    <BlockUploadFromCamera
      onPick={(assets) => {
        const asset = assets[0]
        uploadChildDocument({
          name: asset.fileName || '',
          size: asset.fileSize || 0,
          uri: asset.uri,
        }).catch(noop)
      }}
      style={style}
      label={text.uploadChildDocument}
    />
  )
}

export default ChildDocumentUploadingBlock
