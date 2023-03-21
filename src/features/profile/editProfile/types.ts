import { $editFormData, editProfileFormSchema } from './model'

export type EditProfileForm = typeof $editFormData.defaultState
export type EditUserForm = typeof editProfileFormSchema.__outputType
