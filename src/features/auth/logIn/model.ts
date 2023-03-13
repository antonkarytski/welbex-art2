import { attach } from 'effector'
import { api } from '../../../api'
import { apiManager } from '../../../api/apiManager'
import { createFormModel } from '../../../lib/models/form'

export type LogInForm = {
  email: string
  password: string
}

export const initialLogInFormState: LogInForm = {
  email: '',
  password: '',
}

export const logInFormModel = createFormModel(initialLogInFormState)

export const logIn = attach({
  source: logInFormModel.$store,
  mapParams: (_: void, { email, password }) => ({
    username: email.toLowerCase(),
    password,
  }),
  effect: api.auth.login,
})

logIn.done.watch(({ result }) => {
  apiManager.token.set({
    access: result.access_token,
    refresh: result.refresh_token,
  })
  api.users.me()
})
