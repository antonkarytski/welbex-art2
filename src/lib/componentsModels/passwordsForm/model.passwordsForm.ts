import { attach, createEffect, restore, sample } from 'effector'
import { createFormModel } from '../../../lib/componentsModels/model.form'
import { validatePasswords } from './passwordValidation'
import { PasswordsForm, PasswordsModel } from './types'

export const initialPasswordsFormState: PasswordsForm = {
  password: '',
  repeatingPassword: '',
}

export const createPasswordFormModel = (): PasswordsModel => {
  const passwordsModel = createFormModel(initialPasswordsFormState)

  const validateFx = attach({
    source: passwordsModel.$store,
    effect: createEffect(validatePasswords),
  })

  const $isValid = restore(validateFx.done, null)

  sample({
    clock: passwordsModel.$store,
    source: $isValid,
  }).watch((isValid) => {
    if (isValid !== null) validateFx()
  })

  return { ...passwordsModel, validateFx, $isValid }
}
