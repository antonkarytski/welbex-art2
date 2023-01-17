import { createEffect, restore } from 'effector'
import { createFormModel } from '../../../lib/componentsModels/model.form'
import { validatePasswords } from './passwordValidation'
import { PasswordsForm, PasswordsModel } from './types'

export const initialPasswordsFormState: PasswordsForm = {
  password: '',
  repeatingPassword: '',
}

export const createPasswordFormModel = (): PasswordsModel => {
  const passwordsModel = createFormModel(initialPasswordsFormState)

  const setArePasswordsValidFx = createEffect(() =>
    validatePasswords(passwordsModel.$store.getState())
  )
  const $arePasswordsValid = restore(setArePasswordsValidFx, null)

  passwordsModel.$store.watch(() => {
    if ($arePasswordsValid.getState() !== null) {
      setArePasswordsValidFx()
    }
  })

  return { ...passwordsModel, $arePasswordsValid, setArePasswordsValidFx }
}
