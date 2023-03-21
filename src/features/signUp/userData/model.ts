import * as yup from 'yup'
import { ObjectSchema } from 'yup'
import { createFormModel } from '../../../lib/models/form'
import { stringSchema } from '../../../lib/yup'
import { INITIAL_DATE } from '../constants'
import { SignUpUserDataForm } from './types'

export const signUpUserDataFormSchema: ObjectSchema<SignUpUserDataForm> = yup
  .object()
  .shape({
    name: stringSchema(),
    lastName: stringSchema(),
    birthDate: yup.date().default(INITIAL_DATE).max(new Date()).required(),
    email: stringSchema().email(),
  })
export const signUpUserDataFormModel = createFormModel(signUpUserDataFormSchema)
