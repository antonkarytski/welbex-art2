import { createFormModel } from '../../lib/models/form'

export const feedbackFormInitialState = {
  email: '',
  name: '',
  question: '',
}

export const feedbackFormModel = createFormModel(feedbackFormInitialState)
