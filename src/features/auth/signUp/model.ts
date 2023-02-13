import * as yup from 'yup'
import { createFormModel } from '../../../lib/models/form/model.form'

export const signUpFormSchema = yup.object().shape({
  name: yup.string().default('').required(),
  lastName: yup.string().default('').required(),
  birthDate: yup.date().default(new Date()).max(new Date()).required(),
  email: yup.string().default('').email().required(),
})

export const signUpFormModel = createFormModel(signUpFormSchema)
