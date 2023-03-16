import { attach, createEffect } from 'effector'
import { api } from '../../../api'
import { apiManager } from '../../../api/apiManager'
import { ProfileEditProps } from '../../../api/parts/users/types.parts'
import { Tokens } from '../../../lib/models/apiBuilder/types.token'
import { meRequest } from '../../profile/request'
import {
  $quickAuthCompleteData,
  $quickAuthToken,
  resetQuickAuthData,
} from './model'

type CompleteAuthFxProps = {
  data: ProfileEditProps | null
  tokens: Tokens | null
}
export const completeQuickAuth = attach({
  source: {
    data: $quickAuthCompleteData,
    tokens: $quickAuthToken,
  },
  mapParams: (_: void, store) => store,
  effect: createEffect(async ({ tokens, data }: CompleteAuthFxProps) => {
    if (!tokens) return
    apiManager.token.set(tokens)
    if (data) await api.users.editMe(data)
    await meRequest()
    resetQuickAuthData()
  }),
})
