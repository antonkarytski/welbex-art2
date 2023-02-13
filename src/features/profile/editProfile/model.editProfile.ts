import { createFormModel } from '../../../lib/models/form/model.form'
import { LangFn } from '../../../translations/types'

enum EditProfileFormType {
  NAME = 'name',
  LASTNAME = 'lastName',
  BIRTHDATE = 'birthDate',
}

type ProfileForm = Record<EditProfileFormType, string>

export const initialProfileFormState: ProfileForm = {
  name: '',
  lastName: '',
  birthDate: '',
}

type ProfileFormDescriptor = {
  name: EditProfileFormType
  label: LangFn
}

export const PROFILE_FORM_DESCRIPTORS: ProfileFormDescriptor[] = Object.values(
  EditProfileFormType
).map((name) => ({
  name,
  label: (text) => text[name],
}))

export const profileFormModel = createFormModel(initialProfileFormState)
