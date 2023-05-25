import { FeedbackFile } from '../../../features/feedback/uploads.model'

export type CreateFeedbackProps = {
  title: string
  text: string
  files: FeedbackFile[]
}
