import * as yup from 'yup'
import { createFormModel } from '../../../lib/models/form'
import { stringSchema } from '../../../lib/yup'
import { INITIAL_DATE } from '../constants'

export const signUpUserDataFormSchema = yup.object().shape({
  name: stringSchema(),
  lastName: stringSchema(),
  birthDate: yup.date().default(INITIAL_DATE).max(new Date()).required(),
  email: stringSchema().email(),
})
export const signUpUserDataFormModel = createFormModel(signUpUserDataFormSchema)
