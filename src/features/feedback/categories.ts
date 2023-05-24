import { LangFn } from '../../translations/types'

type FeedbackTitleDescriptor = {
  label: LangFn
  id: number
}

export const FEEDBACK_TITLE: FeedbackTitleDescriptor[] = [
  { label: (text) => text.issueCategory.contest, id: 0 },
  { label: (text) => text.issueCategory.verification, id: 1 },
  { label: (text) => text.issueCategory.payment, id: 2 },
  { label: (text) => text.issueCategory.technicalProblem, id: 3 },
  { label: (text) => text.issueCategory.other, id: 4 },
]
