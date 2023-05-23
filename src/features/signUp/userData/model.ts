import * as yup from 'yup'
import { ObjectSchema } from 'yup'
import { createFormModel } from '../../../lib/models/form'
import { stringSchema } from '../../../lib/yup'
import { SignUpUserDataForm } from './types'

export const signUpUserDataFormSchema: ObjectSchema<SignUpUserDataForm> = yup
  .object()
  .shape({
    name: stringSchema().trim().min(1),
    lastName: stringSchema().trim().min(1),
    email: stringSchema().email(),
  })
export const signUpUserDataFormModel = createFormModel(signUpUserDataFormSchema)
