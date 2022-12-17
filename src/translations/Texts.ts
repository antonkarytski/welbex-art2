import * as translations from './languages'
import { LangStructure, Languages } from './types'

export const TXT: Record<Languages, LangStructure> = {
  ...translations,
} as const
