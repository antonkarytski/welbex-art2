import * as yup from 'yup'
import { createFormModel } from '../../lib/models/form'
import { stringSchema } from '../../lib/yup'
import {
  cleanCardNumber,
  cleanCvv,
  cleanExpirationDate,
  validateCardNumber,
  validateCvv,
  validateExpirationDate,
} from './validation'

const addCardFormSchema = yup.object().shape({
  number: stringSchema().test(validateCardNumber),
  expirationDate: stringSchema().test(validateExpirationDate),
  cvc: stringSchema().test(validateCvv),
  nameOnCard: stringSchema(),
})

export const addCardFormModel = createFormModel(
  addCardFormSchema
).setFieldsSettings({
  expirationDate: {
    map: cleanExpirationDate,
  },
  cvc: {
    map: cleanCvv,
  },
  number: {
    map: cleanCardNumber,
  },
})
