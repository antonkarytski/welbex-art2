import { SignUpBody } from '../../api/parts/users/types.api'
import { USER_DOB_FORMAT } from '../../constants'
import { mapObject } from '../../lib/helpers/array'
import { dateObjectToString } from '../../lib/helpers/date'
import { DEFAULT_COUNTRY } from '../countries'
import { SignUpFormData } from './model'

const FORM_API_REQUEST_PROPS_MAP: {
  [K in keyof SignUpBody]: (props: SignUpFormData) => SignUpBody[K]
} = {
  first_name: ({ user }) => user.name,
  last_name: ({ user }) => user.lastName,
  DOB: ({ user }) => dateObjectToString(user.birthDate, USER_DOB_FORMAT),
  email: ({ user }) => user.email,
  country: ({ country }) => country?.alpha2Code ?? DEFAULT_COUNTRY.alpha2Code,
  password: ({ passwords }) => passwords.password,
  phone_number: ({ phone }) => phone,
}

export const convertSignUpFormToSignUpBody = (props: SignUpFormData) => {
  return mapObject(FORM_API_REQUEST_PROPS_MAP, (fn) => fn(props)) as SignUpBody
}

export const convertFieldToApiProp = <K extends keyof SignUpBody>(
  key: K,
  props: SignUpFormData
) => {
  return FORM_API_REQUEST_PROPS_MAP[key](props) as SignUpBody[K]
}
