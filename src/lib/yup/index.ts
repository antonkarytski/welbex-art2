import * as yup from 'yup'


export const stringSchema = (defaultValue = '') =>
  yup.string().required().default(defaultValue)
