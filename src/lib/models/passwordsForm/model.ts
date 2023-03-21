import * as yup from 'yup'
import { ObjectSchema } from 'yup'
import { stringSchema } from '../../yup'
import { createFormModel } from '../form'

export type PasswordsFormModel = {
  password: string
  passwordConfirmation: string
}

export const passwordsFormSchema: ObjectSchema<PasswordsFormModel> = yup.object(
  {
    password: stringSchema(),
    passwordConfirmation: stringSchema().oneOf(
      [yup.ref('password')],
      'Passwords must match'
    ),
  }
)

export const createPasswordFormModel = () => {
  return createFormModel(passwordsFormSchema)
}
