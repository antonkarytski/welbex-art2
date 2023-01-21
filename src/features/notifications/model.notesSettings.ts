import { createFormModel } from '../../lib/componentsModels/model.testForm'
import { LangStructure } from '../../translations/types'

export const notesSettingsForm: NotesForm = {
  like: false,
  contestInfo: false,
  promotionalNotices: false,
}

type NotesFields = 'like' | 'contestInfo' | 'promotionalNotices'

export type NotesForm = Record<NotesTranslations, boolean>

export type NotesTranslations = keyof Omit<
  LangStructure,
  Exclude<keyof LangStructure, NotesFields>
>

export const notesSettingsList = Object.keys(
  notesSettingsForm
) as NotesTranslations[]

export const notesSettingsModel = createFormModel<boolean, NotesForm>(
  notesSettingsForm
)
