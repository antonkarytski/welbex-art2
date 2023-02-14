import * as yup from 'yup'
import { years } from '../../../lib/helpers/date'
import { createFormModel } from '../../../lib/models/form/model.form'

const INITIAL_DATE = new Date(Date.now() - years(10))

export const signUpFormSchema = yup.object().shape({
  name: yup.string().default('').required(),
  lastName: yup.string().default('').required(),
  birthDate: yup.date().default(INITIAL_DATE).max(new Date()).required(),
  email: yup.string().default('').email().required(),
})

export const signUpFormModel = createFormModel(signUpFormSchema)
