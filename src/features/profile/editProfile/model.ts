import { combine, createEffect, restore, sample } from 'effector'
import { ImagePickerAsset } from 'expo-image-picker'
import * as yup from 'yup'
import { createStateModel } from 'altek-toolkit'
import { MyProfile } from '../../../api/parts/users/types'
import { ProfileEditProps } from '../../../api/parts/users/types.parts'
import { checkObjectsChanges } from '../../../lib/helpers/objects'
import { createFormModel } from '../../../lib/models/form'
import { stringSchema } from '../../../lib/yup'
import { createSearchableCountriesListModel } from '../../countries/model.countriesDropdown'
import { createPhoneEnterModel } from '../../phoneEnter/model'
import { $myProfile } from '../model'
import {
  convertEditFormToRequestBody,
  convertProfileBodyToEditForm,
} from './helpers'

export const editProfileCountryModel = createSearchableCountriesListModel()
export const editProfilePhoneModel = createPhoneEnterModel()

export const editProfileFormSchema = yup.object().shape({
  name: stringSchema().required(),
  lastName: stringSchema().required(),
  birthDate: yup.date().max(new Date()).required().default(new Date()),
})

export const editProfileFormModel = createFormModel(editProfileFormSchema)

$myProfile.watch((state) => {
  if (!state) return
  editProfileCountryModel.setCountry(state.country)
  editProfilePhoneModel.setPhone(state.phone_number)
  editProfileFormModel.set(convertProfileBodyToEditForm(state))
})

const avatarSchema = yup.object({
  uri: yup.string().required(),
  name: yup.string().required(),
  size: yup.number().required(),
})

export type Avatar = yup.InferType<typeof avatarSchema>

export const avatarModel = createStateModel<Avatar | null>(null)

export const setAvatar = (assets: ImagePickerAsset[] | null) => {
  const asset = assets?.[0]
  if (!asset) return
  const avatar = {
    name: asset.fileName || '',
    size: asset.fileSize || 0,
    uri: asset.uri,
  }
  avatarModel.set(avatar)
}

export const $editFormData = combine({
  user: editProfileFormModel.$store,
  phone: editProfilePhoneModel.$phoneNumber,
  country: editProfileCountryModel.countryModel.$state,
  avatar: avatarModel.$state,
})

type SetProfileChangesProps = {
  profileData: MyProfile | null
  editFormData: typeof $editFormData.defaultState
}

const setProfileChanges = createEffect((props: SetProfileChangesProps) => {
  const { profileData, editFormData } = props
  if (!profileData) return null
  const editProfileBody = convertEditFormToRequestBody(editFormData)
  const changedFields = checkObjectsChanges(profileData, editProfileBody)

  return changedFields
})

export const $profileChanges = restore<Partial<ProfileEditProps> | null>(
  setProfileChanges,
  null
)

sample({
  source: { editFormData: $editFormData, profileData: $myProfile },
  target: setProfileChanges,
})
