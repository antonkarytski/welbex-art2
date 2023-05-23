import { useStore } from 'effector-react'
import React, { useState } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { IdentityDocumentStatus } from '../../../api/parts/users/types.api'
import { noop } from '../../../lib/helpers'
import { useText } from '../../../translations/hook'
import PhotoSelectBlock from '../../imagePick/Block.PhotoSelect'
import DocumentStatusMessageBlock from './DocumentStatusMessageBlock'
import { useChildDocumentStatus } from './hooks'
import {
  $isChildDocumentOnLoading,
  childDocumentProgressAnimatedValue,
  uploadChildDocument,
} from './model'

type ChildDocumentUploadingBlockProps = {
  style?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  backgroundColor?: string
}

const ChildDocumentUploadingBlock = ({
  style,
  containerStyle,
  backgroundColor,
}: ChildDocumentUploadingBlockProps) => {
  const text = useText()
  const isOnLoading = useStore($isChildDocumentOnLoading)
  const [isJustUploaded, setIsJustUploaded] = useState(false)
  const childDocumentStatus = useChildDocumentStatus()
  const [showProgressStatus, setShowProgressStatus] = useState(
    childDocumentStatus !== IdentityDocumentStatus.UNDETERMINED
  )
  const isChildDocumentExists =
    childDocumentStatus === IdentityDocumentStatus.DETERMINED ||
    childDocumentStatus === IdentityDocumentStatus.PENDING

  // if (showProgressStatus || isOnLoading) {
  //   return (
  //     <View style={containerStyle}>
  //       <DocumentStatusMessageBlock
  //         status={
  //           isJustUploaded
  //             ? IdentityDocumentStatus.DETERMINED
  //             : childDocumentStatus
  //         }
  //         progressValue={childDocumentProgressAnimatedValue}
  //         isOnLoading={isOnLoading}
  //         onPressRemove={() => setShowProgressStatus(false)}
  //         style={[styles.block, style]}
  //       />
  //     </View>
  //   )
  // }

  return (
    <View style={containerStyle}>
      <PhotoSelectBlock
        backgroundColor={backgroundColor}
        onPick={(assets) => {
          const asset = assets[0]
          uploadChildDocument({
            name: asset.fileName || '',
            size: asset.fileSize || 0,
            uri: asset.uri,
          })
            .then(() => {
              setShowProgressStatus(true)
              setIsJustUploaded(true)
            })
            .catch(noop)
        }}
        style={[styles.block, style]}
        label={
          isChildDocumentExists
            ? text.uploadChildNewDocument
            : text.uploadChildDocument
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    borderRadius: 8,
  },
})

export default ChildDocumentUploadingBlock
