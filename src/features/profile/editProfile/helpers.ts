import moment from 'moment'
import { MyProfile } from '../../../api/parts/users/types'
import { ProfileEditProps } from '../../../api/parts/users/types.parts'
import { mapObject } from '../../../lib/helpers/array'
import {
  checkObjectsChanges,
  isObjectEmpty,
} from '../../../lib/helpers/objects'
import { userAge } from '../../user/helpers'
import { EditProfileForm, EditUserForm, GetProfileChangesProps } from './types'

const birthDateStringToObject = (dateString: string) =>
  new Date(moment(dateString).valueOf())

const PROFILE_BODY_TO_FORM_FIELDS: {
  [Key in keyof EditUserForm]: (props: MyProfile) => EditUserForm[Key]
} = {
  name: ({ first_name }) => first_name,
  lastName: ({ last_name }) => last_name,
  birthDate: ({ DOB }) => (DOB ? birthDateStringToObject(DOB) : null),
}

export const convertProfileBodyToEditForm = (data: MyProfile) => {
  return mapObject(PROFILE_BODY_TO_FORM_FIELDS, (fn) =>
    fn(data)
  ) as EditUserForm
}

const EDIT_FORM_TO_REQUEST_BODY: {
  [Key in keyof ProfileEditProps]: (
    props: EditProfileForm
  ) => ProfileEditProps[Key]
} = {
  first_name: ({ user }) => user.name,
  last_name: ({ user }) => user.lastName,
  country: ({ country }) => country?.alpha2Code,
}

export const convertEditFormToRequestBody = (
  data: EditProfileForm
): ProfileEditProps => {
  return mapObject(EDIT_FORM_TO_REQUEST_BODY, (fn) =>
    fn?.(data)
  ) as ProfileEditProps
}

export const getProfileChanges = (props: GetProfileChangesProps) => {
  const { profileData, editFormData } = props
  if (!profileData) return null
  let result: Partial<MyProfile>
  const editProfileBody = convertEditFormToRequestBody(editFormData)
  const changedFields = checkObjectsChanges(profileData, editProfileBody)
  result = { ...changedFields }
  if (changedFields?.DOB) {
    result.age = userAge(changedFields as MyProfile)
  }
  return isObjectEmpty(result) ? null : result
}
