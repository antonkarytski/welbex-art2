import { EN } from './languages'

export enum Languages {
  EN = 'EN',
  RU = 'RU',
}

export type LangStructure = typeof EN
export type LangFn = (text: LangStructure) => string
