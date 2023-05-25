import * as yup from 'yup'
import { createStateModel } from 'altek-toolkit'
import { createFormModel } from '../../lib/models/form'
import { stringSchema } from '../../lib/yup'
import { FEEDBACK_CATEGORY, FeedbackCategoryDescriptor } from './categories'

const feedbackForm = yup.object().shape({
  message: stringSchema().min(3),
})

export const feedbackFormModel = createFormModel(feedbackForm)

export const feedbackCategoryModel =
  createStateModel<FeedbackCategoryDescriptor | null>(FEEDBACK_CATEGORY[0])
