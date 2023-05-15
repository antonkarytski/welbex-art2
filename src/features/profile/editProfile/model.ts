import { Store, attach, combine, createEffect } from 'effector'
import { ImagePickerAsset } from 'expo-image-picker'
import * as yup from 'yup'
import { createStateModel } from 'altek-toolkit'
import { MyProfile } from '../../../api/parts/users/types'
import { createFormModel } from '../../../lib/models/form'
import { stringSchema } from '../../../lib/yup'
import { createCountryModel } from '../../countries/model.countriesDropdown'
// import { createPhoneEnterModel } from '../../phoneEnter/model'
import { $myProfile } from '../model'
import { convertProfileBodyToEditForm } from './helpers'
import { EditProfileForm } from './types'

export const editProfileCountryModel = createCountryModel()
// export const editProfilePhoneModel = createPhoneEnterModel()

export const editProfileFormSchema = yup.object().shape({
  name: stringSchema().required(),
  lastName: stringSchema().required(),
  birthDate: yup.date().max(new Date()).required().default(new Date()),
})

export const editProfileFormModel = createFormModel(editProfileFormSchema)

export const setEditProfileInitialData = attach({
  source: $myProfile,
  mapParams: (_: void, state: MyProfile | null) => state,
  effect: createEffect((state: MyProfile | null) => {
    if (!state) return
    editProfileCountryModel.set(state.country)
    editProfileFormModel.set(convertProfileBodyToEditForm(state))
  }),
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

export const $editFormData: Store<EditProfileForm> = combine({
  user: editProfileFormModel.$store,
  country: editProfileCountryModel.$state,
})
