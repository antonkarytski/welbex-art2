import { createFormModel } from '../../../lib/models/model.form'

type SignUpForm = {
  name: string
  lastName: string
  birthDate: string
  email: string
}

export const initialSignUpFormState: SignUpForm = {
  name: '',
  lastName: '',
  birthDate: '',
  email: '',
}

export const SIGN_UP_KEYS = Object.keys(
  initialSignUpFormState
) as (keyof SignUpForm)[]

export const signUpFormModel = createFormModel(initialSignUpFormState)
