import { createFormModel } from '../../lib/componentsModels/model.form'

export const feedbackFormInitialState = {
  email: '',
  name: '',
  question: '',
}

export const feedbackFormModel = createFormModel(feedbackFormInitialState)
