import { createFormModel } from '../../lib/componentsModels/model.testForm'
import { LangStructure } from '../../translations/types'

export const notesSettingsForm: NotesForm = {
  like: false,
  contestInfo: false,
  promotionalNotices: false,
}

type NotesFields = 'like' | 'contestInfo' | 'promotionalNotices'

export type NotesForm = Record<keyof NotesTranslations, boolean>

type NotesTranslations = Omit<
  LangStructure,
  Exclude<keyof LangStructure, NotesFields>
>
export const notesSettingsList = Object.keys(
  notesSettingsForm
) as (keyof NotesForm)[]

export const notesSettingsModel = createFormModel<boolean, NotesForm>(
  notesSettingsForm
)
