import { attach, combine } from 'effector'
import { api } from '../../api'
import { CreateFeedbackProps } from '../../api/parts/feedback/types'
import { TXT } from '../../translations/Texts'
import { languageModel } from '../../translations/model.languages'
import { feedbackCategoryModel, feedbackFormModel } from './feedback.model'
import { $selectedFeedbackFiles } from './uploads.model'

const $feedBackFormData = combine(
  {
    category: feedbackCategoryModel.$state,
    form: feedbackFormModel.$store,
    files: $selectedFeedbackFiles,
    language: languageModel.$state,
  },
  ({ category, form, files, language }) => ({
    title: category ? category.label(TXT[language]) : '-',
    text: form.message,
    files,
  })
)

export const sendFeedback = attach({
  source: $feedBackFormData,
  mapParams: (_: void, data: CreateFeedbackProps) => data,
  effect: api.feedback.sendEmail,
})

sendFeedback.fail.watch(({ error }) => {
  console.log('====== sendFeedback ERR =======', JSON.stringify(error))
})
