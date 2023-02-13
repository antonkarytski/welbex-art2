import { ObjectSchema, object, string } from 'yup'
import { createFormModel } from '../../../lib/models/model.form'

type SignUpForm = {
  name: string
  lastName: string
  birthDate: string
  email: string
}

export const initialSignUpFormState: ObjectSchema<SignUpForm> = object({
  name: string().required(),
  lastName: string().required(),
  birthDate: string().required(),
  email: string().email().required(),
})

export const signUpFormModel = createFormModel(initialSignUpFormState)
