import { ProfileEditProps } from '../../../api/parts/users/types.parts'
import { mapObject } from '../../../lib/helpers/array'
import { ValidationState } from '../../../lib/models/form/types'
import { convertFieldToApiProp } from '../../signUp/helpers'
import { SignUpFormData } from '../../signUp/model'
import { signUpUserDataFormModel } from '../../signUp/userData/model'
import { SignUpUserDataForm } from '../../signUp/userData/types'
import { getApiKeyByFormName } from './helpers.converter'
import { ProfileDataFilter } from './types'

export function checkIsFieldAbsent(
  fields: ProfileDataFilter | (keyof ProfileDataFilter)[]
) {
  const filter = Array.isArray(fields)
    ? convertAbsentFieldsListFilter(fields)
    : fields
  return signUpUserDataFormModel.keysList.some(
    (key) => filter[getApiKeyByFormName(key)]
  )
}

export const convertAbsentFieldsListFilter = (
  fields: (keyof ProfileDataFilter)[]
): ProfileDataFilter => {
  return Object.fromEntries(fields.map((field) => [field, true]))
}

export const iosFilter = (key: keyof ProfileEditProps) => {
  return key !== 'first_name' && key !== 'last_name'
}

export const validateAbsentUserData = (
  absentFieldsFilter: ProfileDataFilter,
  validation: Record<keyof SignUpUserDataForm, ValidationState | null>
): null | boolean => {
  return signUpUserDataFormModel.keysList.reduce<null | boolean>((acc, key) => {
    const formKey = getApiKeyByFormName(key)
    const isAbsent = absentFieldsFilter[formKey]
    if (isAbsent && !iosFilter(formKey)) {
      const record = validation[key]
      return record === null ? acc : record.isValid && acc
    }
    return acc
  }, null)
}

export const convertSignUpFormToProfileUpdate = (
  props: SignUpFormData,
  filter: ProfileDataFilter
) => {
  return mapObject(filter, (_, key) =>
    convertFieldToApiProp(key, props)
  ) as ProfileEditProps
}
