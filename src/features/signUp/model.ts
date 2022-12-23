import { createFormModel } from '../../lib/forms/model'

type SignUpForm = {
  name: string
  lastName: string
  birthDate: string
  email: string
  country: string
}

export const signUpFirstPartKeys: (string & keyof SignUpForm)[] = [
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

export const { $store, setField } = createFormModel<
  Record<keyof SignUpForm, string>
>(initialSignUpFormState)
