import { LangStructure, Languages } from '../translations/types'

export type LanguagesObj = Record<Languages, keyof LangStructure>
export type LanguageItem = { key: Languages; name: keyof LangStructure }

export const LANGUAGES: LanguagesObj = {
  EN: 'english',
  RU: 'russian',
} as const

export const LANGUAGES_LIST: LanguageItem[] = Object.entries(LANGUAGES).map(
  ([key, name]) => ({ key: key as Languages, name })
)
