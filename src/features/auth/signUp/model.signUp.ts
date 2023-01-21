import { createFormModel } from '../../../lib/componentsModels/model.form'

type SignUpForm = {
  name: string
  lastName: string
  birthDate: string
  email: string
  country: string
}

export const SIGN_UP_FIRST_PART_KEYS: (keyof SignUpForm)[] = [
  'name',
  'lastName',
  'birthDate',
  'email',
]

export const initialSignUpFormState: SignUpForm = {
  name: '',
  lastName: '',
  birthDate: '',
  email: '',
  country: '',
}

export const signUpFormModel = createFormModel(initialSignUpFormState)
