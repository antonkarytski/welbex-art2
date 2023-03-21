import moment from 'moment'
import { MyProfile } from '../../../api/parts/users/types'
import { ProfileEditProps } from '../../../api/parts/users/types.parts'
import { USER_DOB_FORMAT } from '../../../constants'
import { dateObjectToString } from '../../../lib/helpers/date'
import { renameObjectKeys } from '../../../lib/helpers/objects'
import { EditProfileForm, EditUserForm } from './types'

const birthDateStringToObject = (dateString: string) =>
  new Date(moment(dateString).valueOf())

const BODY_KEYS_TO_FORM_KEYS: Partial<
  Record<keyof MyProfile, keyof EditUserForm>
> = {
  first_name: 'name',
  last_name: 'lastName',
  DOB: 'birthDate',
}

let FORM_KEYS_TO_BODY_KEYS: Partial<
  Record<keyof EditUserForm, keyof MyProfile>
> = {}

Object.entries(BODY_KEYS_TO_FORM_KEYS).forEach(([key, value]) => {
  FORM_KEYS_TO_BODY_KEYS[value] = key as keyof MyProfile
})

export const convertProfileBodyToEditForm = (data: MyProfile) => {
  const renamedFields = renameObjectKeys(data, BODY_KEYS_TO_FORM_KEYS)

  const result = {
    ...renamedFields,
    birthDate: birthDateStringToObject(data.DOB),
  }

  return result as EditUserForm
}

export const convertEditFormToRequestBody = (
  data: EditProfileForm
): ProfileEditProps => {
  const { user } = data

  const renamedUserFields = renameObjectKeys(user, FORM_KEYS_TO_BODY_KEYS)
  const result = {
    ...renamedUserFields,
    DOB: dateObjectToString(user.birthDate, USER_DOB_FORMAT),
    phone_number: data.phone,
    country: data.country?.alpha2Code,
    avatar: data.avatar,
  }

  return result as ProfileEditProps
}
