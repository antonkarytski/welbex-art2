import { createFormModel } from '../../lib/componentsModels/model.form'

export type LogInForm = {
  email: string
  password: string
}

export const initialLogInFormState: LogInForm = {
  email: '',
  password: '',
}

export const logInFormModel = createFormModel(initialLogInFormState)
