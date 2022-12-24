import { createFormModel } from '../../lib/forms/model'

export type LogInForm = {
  email: string
  password: string
}

export const initialLogInFormState: LogInForm = {
  email: '',
  password: '',
}

export const logInFormModel = createFormModel(initialLogInFormState)
