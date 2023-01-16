import { createEffect, restore } from 'effector'
import { createFormModel } from '../../../lib/componentsModels/model.form'
import { validatePasswords } from './passwordValidation'
import { PasswordsForm } from './types'

export const initialPasswordsFormState: PasswordsForm = {
  password: '',
  repeatingPassword: '',
}

export const createPasswordFormModel = () => {
  const passwordsModel = createFormModel(initialPasswordsFormState)

  const setArePasswordsValidFx = createEffect(() =>
    validatePasswords(passwordsModel.$store.getState())
  )
  const $arePasswordsValid = restore(setArePasswordsValidFx, null)
  const arePasswordsValidModel = {
    $store: $arePasswordsValid,
    set: setArePasswordsValidFx,
  }

  return { passwordsModel, arePasswordsValidModel }
}
