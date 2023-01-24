import { addPersist, createStateModel } from 'altek-toolkit'
import { DbFields } from '../lib/db/fields'
import { DEFAULT_LANGUAGE } from './language.default'
import { Languages, LanguagesDescriptor } from './types'

export const LANGUAGES_DESCRIPTOR: LanguagesDescriptor = {
  EN: 'english',
  RU: 'russian',
} as const

export const languageModel = createStateModel<Languages>(DEFAULT_LANGUAGE)

addPersist(languageModel.$state, DbFields.LANGUAGE).onInit(({ result }) => {
  if (result) languageModel.set(result)
})
