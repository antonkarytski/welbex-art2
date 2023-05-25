import * as DocumentPicker from 'expo-document-picker'

export type CreateFeedbackProps = {
  title: string
  text: string
  files: DocumentPicker.DocumentResult[]
}
