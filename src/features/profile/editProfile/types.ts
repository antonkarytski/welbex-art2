import { MyProfile } from '../../../api/parts/users/types'
import { $editFormData, editProfileFormSchema } from './model'

export type EditProfileForm = typeof $editFormData.defaultState
export type EditUserForm = typeof editProfileFormSchema.__outputType
export type GetProfileChangesProps = {
  profileData: MyProfile | null
  editFormData: EditProfileForm
}
