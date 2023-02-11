import {
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from 'effector'
import moment from 'moment'
import { KeyboardTypeOptions } from 'react-native'
import { formatDateInputString } from '../../../lib/helpers/date'
import { isObjectFullfiled } from '../../../lib/helpers/objects'
import { createFormModel } from '../../../lib/models/model.form'
import { FormatFieldValue } from '../../../ui/form/_types'
import { DATE_FORMAT } from './constants'
import { signUpFormSchema } from './validation'

type SignUpForm = {
  name: string
  lastName: string
  birthDate: string
  email: string
}

export const initialSignUpFormState: SignUpForm = {
  name: '',
  lastName: '',
  birthDate: '',
  email: '',
}

export const SIGN_UP_FIELDS: {
  name: keyof SignUpForm
  type?: KeyboardTypeOptions
  formatValue?: FormatFieldValue
}[] = [
  { name: 'name' },
  { name: 'lastName' },
  {
    name: 'birthDate',
    type: 'number-pad',
    formatValue: (str) => {
      return str
    },
  },
  { name: 'email', type: 'email-address' },
]

export const signUpFormModel = createFormModel(initialSignUpFormState)
export const setIsFormValidFx = createEffect<SignUpForm, boolean>((form) => {
  // moment('22.03.2021', DATE_FORMAT).format(DATE_FORMAT)
  const typedForm = {
    ...form,
    birthDate: moment(form.birthDate, DATE_FORMAT).toISOString(true),
  }
  return Boolean(signUpFormSchema.validateSync(typedForm))
})
export const setIsFormValid = createEvent<boolean>()
export const $isFormValid = restore(setIsFormValid, false)

sample({
  source: signUpFormModel.$store,
  filter: (form) => isObjectFullfiled(form),
  target: setIsFormValidFx,
})

setIsFormValidFx.done.watch(({ result }) => setIsFormValid(result))
