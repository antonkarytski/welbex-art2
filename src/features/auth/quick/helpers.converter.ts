import { ProfileEditProps } from '../../../api/parts/users/types.parts'
import { SignUpUserDataForm } from '../../signUp/userData/types'

const FORM_FIELD_TO_API_FIELDS_MAP: Record<
  keyof SignUpUserDataForm,
  keyof ProfileEditProps
> = {
  name: 'first_name',
  lastName: 'last_name',
  email: 'email',
}
export const getApiKeyByFormName = (key: keyof SignUpUserDataForm) =>
  FORM_FIELD_TO_API_FIELDS_MAP[key]
