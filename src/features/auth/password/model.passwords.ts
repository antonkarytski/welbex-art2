import { attach } from 'effector'
import { api } from '../../../api'
import { createPasswordFormModel } from '../../../lib/models/passwordsForm/model'
import { loginAfterSignUp } from '../../signUp/request'

export const newPasswordModel = createPasswordFormModel()
export const sendNewPassword = attach({
  source: newPasswordModel.$store,
  mapParams: (token: string, passwords) => ({
    token,
    password: passwords.password,
  }),
  effect: api.resetPassword.reset,
})

sendNewPassword.done.watch(loginAfterSignUp)
