import { Effect } from 'effector'
import moment from 'moment'
import 'moment/locale/ru'
import { addStorePersist, createStateModel } from 'altek-toolkit'
import { DbFields } from '../lib/db/fields'
import { DEFAULT_LANGUAGE } from './language.default'
import { Languages, LanguagesDescriptor } from './types'

export const LANGUAGES_DESCRIPTOR: LanguagesDescriptor = {
  EN: 'english',
  RU: 'russian',
} as const

export const languageModel = createStateModel<Languages>(DEFAULT_LANGUAGE)

addStorePersist({
  $store: languageModel.$state,
  saveTo: DbFields.LANGUAGE,
}).onInit((result) => {
  if (result) languageModel.set(result)
})

languageModel.$state.watch((language) => {
  moment.locale(language.toLowerCase())
})

export const withLanguageModel = <P extends object>(
  effect: Effect<any, any>
) => {
  return
}
