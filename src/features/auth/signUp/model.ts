import { createEffect, createEvent, restore, sample } from 'effector'
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

export const signUpFormModel = createFormModel(initialSignUpFormState)
export const birthDateModel = createStateModel(new Date())

export const setIsFormValidFx = createEffect<SignUpForm, boolean>((form) => {
  // return signUpFormSchema.isValidSync(form)
  return true
})
export const setIsFormValid = createEvent<boolean>()
export const $isFormValid = restore(setIsFormValid, false)

sample({
  source: signUpFormModel.$store,
  filter: isObjectFullfiled,
  target: setIsFormValidFx,
})

setIsFormValidFx.done.watch(({ result }) => setIsFormValid(result))
