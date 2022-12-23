import * as yup from 'yup'

export interface LogInFields {
  email: string
  password: string
}

export const LoginFormSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})
