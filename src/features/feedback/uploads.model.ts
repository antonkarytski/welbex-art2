import { createEvent, createStore } from 'effector'
import { createListMethodsModel } from '../../lib/models/list/model.listMethods'

export type FeedbackFile = {
  name: string
  uri: string
  size: number
  mimeType?: string
  lastModified?: number
  file?: File
  output?: FileList | null
}

export const resetFeedbackFiles = createEvent()
export const $selectedFeedbackFiles = createStore<FeedbackFile[]>([]).reset(
  resetFeedbackFiles
)

const fileIdExtractor = (file: Partial<FeedbackFile>): string => file.uri || ''

export const feedbackFileListModel = createListMethodsModel<FeedbackFile>(
  $selectedFeedbackFiles,
  fileIdExtractor
)
