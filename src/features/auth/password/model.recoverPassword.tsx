import * as yup from 'yup'
import { ObjectSchema } from 'yup'
import { api } from '../../../api'
import { prependEffect } from '../../../lib/helpers/effector'
import { createFormModel } from '../../../lib/models/form'
import { stringSchema } from '../../../lib/yup'
import PopUpUnexpectedError from '../../popUp/PopUp.UnexpectedError'
import PopUpRecoverPassword from '../../popUp/authPopUps/PopUp.RecoverPassword'

type SendRecoverEmailForm = {
  email: string
}

export const sendRecoverEmailSchema: ObjectSchema<SendRecoverEmailForm> = yup
  .object()
  .shape({
    email: stringSchema().email(),
  })

export const recoverPasswordFormModel = createFormModel(
  sendRecoverEmailSchema
).setSubmitSettings({
  validate: true,
  request: prependEffect(api.resetPassword.sendResetLink, ({ email }) => email),
})

api.resetPassword.sendResetLink.done.watch(({ params }) => {
  PopUpRecoverPassword.showSync({ props: { email: params } })
})

api.resetPassword.sendResetLink.fail.watch(() => {
  PopUpUnexpectedError.showSync()
})
