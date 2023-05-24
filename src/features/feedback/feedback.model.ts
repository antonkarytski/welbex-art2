import { createStateModel } from 'altek-toolkit'
import { createFormModel } from '../../lib/models/form'
import { FEEDBACK_CATEGORY, FeedbackCategoryDescriptor } from './categories'

export const feedbackFormInitialState = {
  email: '',
  name: '',
  question: '',
}
export const feedbackCategoryModel =
  createStateModel<FeedbackCategoryDescriptor | null>(FEEDBACK_CATEGORY[0])

export const feedbackFormModel = createFormModel(feedbackFormInitialState)
