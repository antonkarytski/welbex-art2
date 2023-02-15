import { createEvent, sample } from 'effector'
import { mockCheckLogin } from '../../../_mock/login'
import { createFormModel } from '../../../lib/models/form'
import { setIsAuth } from '../model'

export type LogInForm = {
  email: string
  password: string
}

export const initialLogInFormState: LogInForm = {
  email: '',
  password: '',
}

export const logInFormModel = createFormModel(initialLogInFormState)

export const logIn = createEvent()
sample({
  source: logInFormModel.$store,
  clock: logIn,
  fn: (source) => source,
}).watch((userData) => {
  if (mockCheckLogin(userData)) setIsAuth(true)
})
