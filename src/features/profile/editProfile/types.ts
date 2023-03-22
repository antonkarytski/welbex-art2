import { MyProfile } from '../../../api/parts/users/types'
import { Country } from '../../countries'

export type EditUserForm = {
  name: string
  lastName: string
  birthDate: Date
}

export type EditProfileForm = {
  user: EditUserForm
  country: Country | null
}

export type GetProfileChangesProps = {
  profileData: MyProfile | null
  editFormData: EditProfileForm
}
