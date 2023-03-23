import { attach, createEffect } from 'effector'
import { api } from '../../../api'
import { ProfileEditProps } from '../../../api/parts/users/types.parts'
import { $myProfile, updateProfile } from '../model'
import { getProfileChanges } from './helpers'
import { $editFormData, Avatar, avatarModel } from './model'
import { GetProfileChangesProps } from './types'

type AvatarProp = {
  avatar?: Avatar | null
}

type RequestEffectProps = {
  changedFields: Partial<ProfileEditProps> | null
} & AvatarProp

export const updateMyProfileRequest = attach({
  source: {
    editFormData: $editFormData,
    profileData: $myProfile,
    avatar: avatarModel.$state,
  },
  mapParams: (_: void, data: GetProfileChangesProps & AvatarProp) => {
    const { avatar, editFormData, profileData } = data
    const changedFields = getProfileChanges({ editFormData, profileData })
    return { avatar, changedFields }
  },
  effect: createEffect(async (data: RequestEffectProps) => {
    const { avatar, changedFields } = data

    if (changedFields) {
      await api.users.editMe(changedFields)
      updateProfile(changedFields)
    }
    if (avatar) {
      await api.users.uploadAvatar(avatar)
      updateProfile({ avatar })
      avatarModel.set(null)
    }
  }),
})

export const deleteAvatar = async () => {
  await api.users.deleteAvatar()
  updateProfile({ avatar: null })
  avatarModel.set(null)
}
