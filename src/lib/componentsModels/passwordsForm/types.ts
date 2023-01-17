import { Effect, Store } from 'effector'
import { FormModel } from '../../../lib/componentsModels/model.form'

export type PasswordsForm = {
  password: string
  repeatingPassword: string
}

export type PasswordsModel = FormModel<PasswordsForm> & {
  $arePasswordsValid: Store<boolean | null>
  setArePasswordsValidFx: Effect<void, boolean>
}
