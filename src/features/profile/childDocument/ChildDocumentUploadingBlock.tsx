import { useStore } from 'effector-react'
import React, { useState } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { noop } from '../../../lib/helpers'
import { useText } from '../../../translations/hook'
import PhotoSelectBlock from '../../imagePick/Block.PhotoSelect'
import ChildDocumentModerationStatusBlock from './ChildDocumentModerationStatusBlock'
import DocumentStatusMessageBlock from './DocumentStatusMessageBlock'
import {
  $isChildDocumentOnLoading,
  $isChildDocumentUploaded,
  childDocumentProgressAnimatedValue,
  uploadChildDocument,
} from './model'

type ChildDocumentUploadingBlockProps = {
  style?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
}

const ChildDocumentUploadingBlock = ({
  style,
  containerStyle,
}: ChildDocumentUploadingBlockProps) => {
  const text = useText()
  const isOnLoading = useStore($isChildDocumentOnLoading)
  const isChildDocumentUploaded = useStore($isChildDocumentUploaded)
  const [showProgressStatus, setShowProgressStatus] = useState(false)

  if (showProgressStatus || isOnLoading) {
    return (
      <DocumentStatusMessageBlock
        progressValue={childDocumentProgressAnimatedValue}
        isOnLoading={isOnLoading}
        onPressRemove={() => setShowProgressStatus(false)}
        style={style}
      />
    )
  }

  return (
    <View style={containerStyle}>
      <ChildDocumentModerationStatusBlock />
      <PhotoSelectBlock
        onPick={(assets) => {
          const asset = assets[0]
          uploadChildDocument({
            name: asset.fileName || '',
            size: asset.fileSize || 0,
            uri: asset.uri,
          })
            .then(() => {
              setShowProgressStatus(true)
            })
            .catch(noop)
        }}
        style={style}
        label={
          isChildDocumentUploaded
            ? text.uploadChildNewDocument
            : text.uploadChildDocument
        }
      />
    </View>
  )
}

export default ChildDocumentUploadingBlock
