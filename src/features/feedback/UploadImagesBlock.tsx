import { useStore } from 'effector-react'
import React from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { useText } from '../../translations/hook'
import PhotoSelectBlock, {
  GALLERY_SOURCE_PRESET,
} from '../imagePick/Block.PhotoSelect'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'
import { MAX_FILE_SIZE_TO_UPLOAD, SELECTION_LIMIT } from './constants'
import { $selectedFeedbackImages } from './uploads.model'

type UploadImagesBlockProps = {
  style?: StyleProp<ViewStyle>
}

const UploadImagesBlock = ({}: UploadImagesBlockProps) => {
  const t = useText()
  const { styles, colors } = useTheme(themedStyles)
  const selectedImages = useStore($selectedFeedbackImages)

  return (
    <PhotoSelectBlock
      selectionLimit={SELECTION_LIMIT}
      style={styles.uploadBlock}
      backgroundColor={colors.inputBackground}
      label={t.feedbackForm.uploadFile}
      subLabel={t.feedbackForm.maxFileSize(MAX_FILE_SIZE_TO_UPLOAD)}
      onPick={() => {}}
      sources={GALLERY_SOURCE_PRESET}
    />
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    uploadBlock: {
      backgroundColor: colors.inputBackground,
      borderColor: colors.inputBorder,
      borderWidth: 1,
      borderRadius: 8,
    },
  })
)

export default UploadImagesBlock
