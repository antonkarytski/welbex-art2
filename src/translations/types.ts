import { EN } from './languages/en'

export enum Languages {
	EN = 'EN',
	RU = 'RU'
}

export type TLangStructure = typeof EN
export type TLangFn = (text: TLangStructure) => string