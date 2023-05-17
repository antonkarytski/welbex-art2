import { Tokens } from '@heyheyjude/toolkit'
import { createEvent, createStore } from 'effector'
import * as yup from 'yup'
import { ProfileEditProps } from '../../../api/parts/users/types.parts'
import { createFormModel } from '../../../lib/models/form'
import { INITIAL_DATE } from '../../signUp/constants'
import { convertAbsentFieldsListFilter } from './helpers'
import { ProfileDataFilter } from './types'

type SetQuickAuthDataPayload = {
  tokens: Tokens
  absentFields?: (keyof ProfileEditProps)[]
}

export const resetQuickAuthData = createEvent()
export const quickAuthFormSchema = yup.object().shape({
  birthDate: yup.date().default(INITIAL_DATE).max(new Date()).required(),
})
export const quickAuthFormModel = createFormModel(quickAuthFormSchema)
quickAuthFormModel.reset(resetQuickAuthData)

export const setQuickAuthData = createEvent<SetQuickAuthDataPayload>()

export const $quickAuthToken = createStore<Tokens | null>(null)
  .on(setQuickAuthData, (_, payload) => payload.tokens)
  .reset(resetQuickAuthData)

export const $quickAuthAbsentFields = createStore<ProfileDataFilter | null>(
  null
)
  .on(setQuickAuthData, (_, { absentFields }) => {
    if (!absentFields || absentFields.length === 0) return null
    return convertAbsentFieldsListFilter(absentFields)
  })
  .reset(resetQuickAuthData)

export const $isOnQuickAuth = $quickAuthToken.map(Boolean)
