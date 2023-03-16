import { useStore } from 'effector-react'
import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { IdentityDocumentStatus } from '../../api/parts/users/types.api'
import { noop } from '../../lib/helpers'
import { useFormField } from '../../lib/models/form'
import { useText } from '../../translations/hook'
import BlockUploadFromCamera from '../imagePick/Block.UploadFromCamera'
import PopUpPhotoEditActionSelect from '../popUp/PopUp.PhotoEditActionSelect'
import { updateProfile } from '../profile/model'
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
        PopUpPhotoEditActionSelect.showSync({
          props: {
            hideRemoveButton: true,
          },
        })
        // const asset = assets[0]
        // uploadChildDocument({
        //   name: asset.fileName || '',
        //   size: asset.fileSize || 0,
        //   uri: asset.uri,
        // })
        //   .then(() => {
        //     updateProfile({
        //       identity_determined_status_id: IdentityDocumentStatus.PENDING,
        //     })
        //     setIsDocumentLoaded(true)
        //   })
        //   .catch(noop)
      }}
      style={style}
      label={text.uploadChildDocument}
    />
  )
}

export default ChildDocumentUploadingBlock
