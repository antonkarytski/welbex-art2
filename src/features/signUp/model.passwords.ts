import * as yup from 'yup'
import { createFormModel } from '../../lib/models/form'
import { passwordsFormSchema } from '../../lib/models/passwordsForm/model'

const signUpPasswordsFormSchema = passwordsFormSchema.concat(
  yup.object({
    userAgreement: yup.boolean().default(false).required(),
  })
)

export const signUpPasswordsFormModel = createFormModel(
  signUpPasswordsFormSchema
)
