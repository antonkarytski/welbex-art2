import * as yup from 'yup'
import { years } from '../../../lib/helpers/date'
import { createFormModel } from '../../../lib/models/form'
import { stringSchema } from '../../../lib/yup'

const INITIAL_DATE = new Date(Date.now() - years(10))

export const signUpUserDataFormSchema = yup.object().shape({
  name: stringSchema(),
  lastName: stringSchema(),
  birthDate: yup.date().default(INITIAL_DATE).max(new Date()).required(),
  email: stringSchema().email(),
})

export const signUpUserDataFormModel = createFormModel(signUpUserDataFormSchema)
