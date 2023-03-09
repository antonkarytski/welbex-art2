import { attach } from 'effector'
import * as yup from 'yup'
import { ObjectSchema } from 'yup'
import { api } from '../../../api'
import { apiManager } from '../../../api/apiManager'
import { noop } from '../../../lib/helpers'
import { createFormModel } from '../../../lib/models/form'
import { stringSchema } from '../../../lib/yup'
import { meRequest } from '../../profile/request'

export type LogInForm = {
  email: string
  password: string
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

logIn.done.watch(({ result }) => {
  apiManager.token.set({
    access: result.access_token,
    refresh: result.refresh_token,
  })
  meRequest().catch(noop)
})
