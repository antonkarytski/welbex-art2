import { createFormModel } from '../../lib/models/form/model.form'

export const feedbackFormInitialState = {
  email: '',
  name: '',
  question: '',
}

export const feedbackFormModel = createFormModel(feedbackFormInitialState)
