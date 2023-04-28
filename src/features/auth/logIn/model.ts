import { attach, createEvent, restore } from 'effector'
import * as yup from 'yup'
import { ObjectSchema } from 'yup'
import { api } from '../../../api'
import { apiManager } from '../../../api/apiManager'
import { LoginResponse } from '../../../api/parts/auth/types'
import { noop } from '../../../lib/helpers'
import { ApiError } from '../../../lib/models/apiBuilder/errors'
import { createFormModel } from '../../../lib/models/form'
import { stringSchema } from '../../../lib/yup'
import { meRequest } from '../../profile/request'
import { tokenResponseToTokens } from './helpers.token'

export type LogInForm = {
  email: string
  password: string
}

const setIsLoginAccessError = createEvent<boolean>()
export const $isLoginAccessError = restore(setIsLoginAccessError, false)

export const handleLogin = ({ result }: { result: LoginResponse }) => {
  setIsLoginAccessError(false)
  apiManager.token.set(tokenResponseToTokens(result))
  meRequest().catch(noop)
  setIsLoginAccessError(false)
}

const logInFormSchema: ObjectSchema<LogInForm> = yup.object().shape({
  email: stringSchema().email(),
  password: stringSchema(),
})

export const logInFormModel = createFormModel(logInFormSchema)

export const logIn = attach({
  source: logInFormModel.$store,
  mapParams: (_: void, { email, password }) => ({
    username: email.toLowerCase(),
    password,
  }),
  effect: api.auth.login,
})
logIn.done.watch(handleLogin)

api.auth.login.fail.watch(({ error }) => {
  if ((error as ApiError).status === 401) {
    setIsLoginAccessError(true)
  }
})
