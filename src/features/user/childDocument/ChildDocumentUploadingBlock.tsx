import { useStore } from 'effector-react'
import React, { useEffect, useState } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { IdentityDocumentStatus } from '../../../api/parts/users/types.api'
import { noop } from '../../../lib/helpers'
import { useText } from '../../../translations/hook'
import Span from '../../../ui/Span'
import PhotoSelectBlock from '../../imagePick/Block.PhotoSelect'
import { createThemedStyle } from '../../themed'
import { useTheme } from '../../themed/hooks'
import DocumentStatusMessageBlock from './DocumentStatusMessageBlock'
import { getChildDocumentStatusDescriptor } from './helpers'
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
  const childDocumentStatus = useChildDocumentStatus()
  const [isJustUploaded, setIsJustUploaded] = useState(false)
  const statusDescriptor = getChildDocumentStatusDescriptor(
    isJustUploaded ? IdentityDocumentStatus.JUST_UPLOADED : childDocumentStatus
  )
  const [showProgressStatus, setShowProgressStatus] = useState(
    !statusDescriptor.withUploadButtonVariant
  )
  const { styles, colors } = useTheme(themedStyles)

  useEffect(() => {
    setShowProgressStatus(!statusDescriptor.withUploadButtonVariant)
  }, [statusDescriptor])

  if (showProgressStatus || isOnLoading) {
    return (
      <View style={containerStyle}>
        <DocumentStatusMessageBlock
          descriptor={statusDescriptor}
          progressValue={childDocumentProgressAnimatedValue}
          isOnLoading={isOnLoading}
          onPressRemove={() => setShowProgressStatus(false)}
          style={[styles.block, style]}
        />
      </View>
    )
  }

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
            .then(() => setIsJustUploaded(true))
            .catch(noop)
        }}
        style={[styles.block, style]}
        label={text.childIdentityStatusMessage.request}
      />
      {statusDescriptor.withUploadButtonVariant && !!statusDescriptor.label && (
        <View style={styles.statusTextBlock}>
          <statusDescriptor.Icon color={statusDescriptor.color?.(colors)} />
          <Span
            style={styles.statusTextBlockText}
            label={statusDescriptor.label(text)}
          />
        </View>
      )}
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    block: {
      borderRadius: 8,
    },
    statusTextBlock: {
      marginTop: 16,
      flexDirection: 'row',
    },
    statusTextBlockText: {
      marginLeft: 13,
      color: colors.text,
    },
  })
)

export default ChildDocumentUploadingBlock
