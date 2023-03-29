import { attach, createEffect } from 'effector'
import { api } from '../../../api'
import { apiManager } from '../../../api/apiManager'
import { ProfileEditProps } from '../../../api/parts/users/types.parts'
import { Tokens } from '../../../lib/models/apiBuilder/types.token'
import { meRequest } from '../../profile/request'
import { $signUpFormData, SignUpFormData } from '../../signUp/model'
import { convertSignUpFormToProfileUpdate } from './helpers'
import {
  $quickAuthAbsentFields,
  $quickAuthToken,
  resetQuickAuthData,
} from './model'
import { ProfileDataFilter } from './types'

type CompleteAuthFxProps = {
  absentFields: ProfileDataFilter | null
  data: SignUpFormData
  tokens: Tokens | null
}
export const completeQuickAuth = attach({
  source: {
    absentFields: $quickAuthAbsentFields,
    data: $signUpFormData,
    tokens: $quickAuthToken,
  },
  mapParams: (_: void, store) => store,
  effect: createEffect(
    async ({ tokens, data, absentFields }: CompleteAuthFxProps) => {
      if (!tokens) return
      apiManager.token.set(tokens)
      if (absentFields) {
        const update = convertSignUpFormToProfileUpdate(data, absentFields)
        await api.users.editMe(update)
      }
      await meRequest()
      resetQuickAuthData()
    }
  ),
})