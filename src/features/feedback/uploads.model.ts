import { createStore } from 'effector'
import * as DocumentPicker from 'expo-document-picker'
import { createListMethodsModel } from '../../lib/models/list/model.listMethods'

export const $selectedFeedbackFiles = createStore<
  DocumentPicker.DocumentResult[]
>([])

const fileIdExtractor = (
  file: Partial<DocumentPicker.DocumentResult>
): string => file.uri as string

export const feedbackFileListModel =
  createListMethodsModel<DocumentPicker.DocumentResult>(
    $selectedFeedbackFiles,
    fileIdExtractor
  )
