import { createFormModel } from '../../lib/componentsModels/model.form'
import { createEvent, sample } from 'effector'
import { mockCheckLogin } from '../../_mock/login'
import { setIsAuth } from '../authServices/model'


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
  console.log(userData)
  if (mockCheckLogin(userData)) setIsAuth(true)
})
