import { attach, createEffect } from 'effector'
import { api } from '../../../api'
import { ProfileEditProps } from '../../../api/parts/users/types.parts'
import { updateProfile } from '../model'
import { $profileChanges, Avatar, avatarModel } from './model'

export const updateMyProfileRequest = attach({
  source: {
    data: $profileChanges,
  },
  mapParams: (_: void, { data }) => data,

  effect: createEffect(
    async (data: Partial<ProfileEditProps & { avatar: Avatar }> | null) => {
      const avatar = data?.avatar
      const requestBody = { ...data }
      delete requestBody.avatar

      if (requestBody) {
        await api.users.editMe(requestBody)
        updateProfile(requestBody)
      }
      if (avatar) {
        await api.users.uploadAvatar(avatar)
        updateProfile({ avatar })
        avatarModel.set(null)
      }
    }
  ),
})

export const deleteAvatar = async () => {
  await api.users.deleteAvatar()
  updateProfile({ avatar: null })
  avatarModel.set(null)
}
