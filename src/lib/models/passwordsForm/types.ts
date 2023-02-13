import { Effect, Store } from 'effector'
import { FormModel } from '../../../lib/models/model.form'

export type PasswordsForm = {
  password: string
  repeatingPassword: string
}

export type PasswordsModel = FormModel<PasswordsForm> & {
  $isValid: Store<boolean | null>
  validateFx: Effect<void, boolean>
}