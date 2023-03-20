import { attach, createEffect } from 'effector'
import { api } from '../../../api'
import { EditProfileBody } from '../../../api/parts/users/types.api'
import { updateProfile } from '../model'
import { $profilePhoneNumber, editProfileFormModel } from './model.editProfile'

export const updateMyProfileRequest = attach({
  source: {
    userData: editProfileFormModel.$store,
    phone_number: $profilePhoneNumber,
  },
  mapParams: (_: void, { userData, phone_number }) => ({
    first_name: userData.name,
    last_name: userData.lastName,
    DOB: userData.birthDate,
    phone_number,
  }),
  effect: createEffect((_: void, data: EditProfileBody) => {
    api.users.updateMyProfile(data).then(() => {
      updateProfile(data)
    })
  }),
})
