import { createEffect, createEvent, restore, sample } from 'effector'
import { KeyboardTypeOptions } from 'react-native'
import { createStateModel } from 'altek-toolkit'
import { isObjectFullfiled } from '../../../lib/helpers/objects'
import { createFormModel } from '../../../lib/models/model.form'
import { signUpFormSchema } from './validation'

type SignUpForm = {
  name: string
  lastName: string
  email: string
}

export const initialSignUpFormState: SignUpForm = {
  name: '',
  lastName: '',
  email: '',
}

export const SIGN_UP_FIELDS: {
  name: keyof SignUpForm
  type?: KeyboardTypeOptions
}[] = [
  { name: 'name' },
  { name: 'lastName' },
  { name: 'email', type: 'email-address' },
]

export const signUpFormModel = createFormModel(initialSignUpFormState)
export const birthDateModel = createStateModel(new Date())

export const setIsFormValidFx = createEffect<SignUpForm, boolean>((form) => {
  return Boolean(signUpFormSchema.validateSync(form))
})
export const setIsFormValid = createEvent<boolean>()
export const $isFormValid = restore(setIsFormValid, false)

sample({
  source: signUpFormModel.$store,
  filter: (form) => isObjectFullfiled(form),
  target: setIsFormValidFx,
})

setIsFormValidFx.done.watch(({ result }) => setIsFormValid(result))
