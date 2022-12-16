import * as translations from './languages'
import { Languages, TLangStructure } from './types'

export const TXT: Record<Languages, TLangStructure> = {
	...translations
} as const 