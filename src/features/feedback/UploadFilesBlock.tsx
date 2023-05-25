import convertSize from 'convert-size'
import { useStore } from 'effector-react'
import { DocumentPickerOptions, getDocumentAsync } from 'expo-document-picker'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { byteToMB } from '../../lib/files/sizes'
import { truncateStringCenter } from '../../lib/helpers/strings'
import { useText } from '../../translations/hook'
import FileSelectBlock from '../../ui/selectFileBlock/Block.FileSelect'
import UploadedFileBlock from '../../ui/selectFileBlock/Block.UploadedFile'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import { MAX_FILE_SIZE_TO_UPLOAD, SELECTION_LIMIT } from './constants'
import {
  $selectedFeedbackFiles,
  FeedbackFile,
  feedbackFileListModel,
} from './uploads.model'

type UploadFilesBlockProps = {
  selectionLimit?: number
} & DocumentPickerOptions

const UploadFilesBlock = ({
  ...documentPickerOptions
}: UploadFilesBlockProps) => {
  const t = useText()
  const { styles, colors } = useThemedStyleList({
    filePicker: themedStyles,
    uploadedFileBlock: themedUploadedFileStyles,
  })
  const selectedFiles = useStore($selectedFeedbackFiles)

  const [isFileSizeError, setIsFileSizeError] = useState(false)

  const onPick = async () => {
    const file = await getDocumentAsync(documentPickerOptions)
    if (file?.type === 'success') {
      if (byteToMB(file.size || 0) > MAX_FILE_SIZE_TO_UPLOAD) {
        return setIsFileSizeError(true)
      }
      setIsFileSizeError(false)
      feedbackFileListModel.addItem(file as FeedbackFile)
    }
  }

  return (
    <>
      {selectedFiles.map((file) => (
        <UploadedFileBlock
          key={file.uri}
          label={truncateStringCenter(file.name, 19)}
          subLabel={convertSize(file.size ?? 0)}
          imageUri={file.mimeType?.includes('image') ? file.uri : undefined}
          style={styles.uploadedFileBlock}
          onPressCrossIcon={() => feedbackFileListModel.deleteItem(file.uri)}
          fileIconColor={colors.textAccent}
        />
      ))}
      {selectedFiles.length < SELECTION_LIMIT && (
        <FileSelectBlock
          label={t.feedbackForm.uploadFile}
          subLabel={t.feedbackForm.maxFileSize(MAX_FILE_SIZE_TO_UPLOAD)}
          backgroundColor={colors.inputBackground}
          style={{
            ...styles.filePicker,
            subText: isFileSizeError && { color: colors.errorText },
          }}
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
    text: {
      marginBottom: 5,
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
    text: {
      marginBottom: 5,
    },
  })
)

export default UploadFilesBlock
