import { useStore } from 'effector-react'
import * as DocumentPicker from 'expo-document-picker'
import React from 'react'
import { StyleSheet } from 'react-native'
import { truncateStringCenter } from '../../lib/helpers/strings'
import { useText } from '../../translations/hook'
import FileSelectBlock, {
  FileSelectBlockStyle,
} from '../../ui/selectFileBlock/Block.FileSelect'
import UploadedFileBlock from '../../ui/selectFileBlock/Block.UploadedFile'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import { MAX_FILE_SIZE_TO_UPLOAD, SELECTION_LIMIT } from './constants'
import { $selectedFeedbackFiles, feedbackFileListModel } from './uploads.model'

type UploadFilesBlockProps = {
  selectionLimit?: number
  style?: FileSelectBlockStyle
} & DocumentPicker.DocumentPickerOptions

const UploadFilesBlock = ({
  style,
  ...documentPickerOptions
}: UploadFilesBlockProps) => {
  const t = useText()
  const { styles, colors } = useThemedStyleList({
    filePicker: themedStyles,
    uploadedFileBlock: themedUploadedFileStyles,
  })
  const selectedFiles = useStore($selectedFeedbackFiles)

  const onPick = async () => {
    const file = await DocumentPicker.getDocumentAsync(documentPickerOptions)
    feedbackFileListModel.addItem(file)
    console.log('files', file)
  }

  return (
    <>
      {selectedFiles.map((file) => (
        <UploadedFileBlock
          key={file.uri}
          label={truncateStringCenter(file.name, 19)}
          subLabel={''}
          imageUri={file.uri}
          style={styles.uploadedFileBlock}
          onPressCrossIcon={() => feedbackFileListModel.deleteItem(file.uri)}
        />
      ))}
      {selectedFiles.length < SELECTION_LIMIT && (
        <FileSelectBlock
          label={t.feedbackForm.uploadFile}
          subLabel={t.feedbackForm.maxFileSize(MAX_FILE_SIZE_TO_UPLOAD)}
          backgroundColor={colors.inputBackground}
          style={{ ...styles.filePicker, ...style }}
          onPress={onPick}
          dashedBlockSizes={{
            size: 76,
            crossSize: 30,
          }}
        />
      )}
    </>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    dashedBlock: {
      borderColor: colors.textLightGrey,
      borderRadius: 8,
    },
    container: {
      backgroundColor: colors.inputBackground,
      borderWidth: 1,
      borderColor: colors.inputBorder,
      borderRadius: 8,
    },
  })
)

const themedUploadedFileStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.inputBackground,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: colors.inputBorder,
      marginBottom: 12,
    },
  })
)

export default UploadFilesBlock
