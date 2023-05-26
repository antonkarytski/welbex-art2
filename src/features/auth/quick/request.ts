import { Tokens } from '@heyheyjude/toolkit'
import { attach, createEffect } from 'effector'
import { api } from '../../../api'
import { apiManager } from '../../../api/apiManager'
import { initProfile } from '../../profile/request'
import {
  $signUpFormData,
  SignUpFormData,
  resetSignUpFormData,
} from '../../signUp/model'
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
      console.log('STEP@')
      await initProfile()
      resetQuickAuthData()
      resetSignUpFormData()
    }
  ),
})

completeQuickAuth.fail.watch((e) => {
  console.log(e)
})
