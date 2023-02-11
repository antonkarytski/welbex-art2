import * as yup from 'yup'

export const signUpFormSchema = yup.object().shape({
  name: yup.string().required(),
  lastName: yup.string().required(),
  birthDate: yup.date().max(new Date()).required(),
  email: yup.string().email().required(),
})
