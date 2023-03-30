import * as yup from 'yup'
import { ObjectSchema } from 'yup'
import { stringSchema } from '../../yup'
import { createFormModel } from '../form'

export type PasswordsFormModel = {
  password: string
  passwordConfirmation: string
}

export enum PasswordErrors {
  PASSWORD_MIN_LENGTH = 'Password must contain at least 8 characters',
  PASSWORD_MUST_MATCH = 'Passwords must match',
}

export const passwordsFormSchema: ObjectSchema<PasswordsFormModel> = yup.object(
  {
    password: stringSchema()
      .min(8)
      .matches(
        /"(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}"/,
        PasswordErrors.PASSWORD_MIN_LENGTH
      ),
    passwordConfirmation: stringSchema('').oneOf(
      [yup.ref('password')],
      PasswordErrors.PASSWORD_MUST_MATCH
    ),
  }
)

export const createPasswordFormModel = () => {
  return createFormModel(passwordsFormSchema)
}
