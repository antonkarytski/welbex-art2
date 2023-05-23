import { EN } from './languages'

export enum Languages {
  EN = 'EN',
  RU = 'RU',
}

export type LangStructure = typeof EN
export type LangFn<R = string> = (text: LangStructure) => R
export type LanguagesDescriptor = Record<Languages, keyof LangStructure>
