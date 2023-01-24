import { addPersist } from 'altek-toolkit'
import { createFormModel } from '../../../lib/componentsModels/model.form'
import { DbFields } from '../../../lib/db/fields'
import { LangFn } from '../../../translations/types'

export enum NotificationType {
  LIKE = 'like',
  CONTEST_INFO = 'contestInfo',
  PROMOTION = 'promotionalNotices',
}

export type NotificationsSetting = Record<NotificationType, boolean>

export type NotificationSwitchDescriptor = {
  name: NotificationType
  label: LangFn
}

export const notificationsInitialState: NotificationsSetting = {
  like: false,
  contestInfo: false,
  promotionalNotices: false,
}

const NOTIFICATIONS_NAMES = Object.values(NotificationType)

export const NOTIFICATIONS_DESCRIPTORS: NotificationSwitchDescriptor[] =
  NOTIFICATIONS_NAMES.map((key) => ({
    name: key,
    label: (text) => text[key],
  }))

export const notificationsSettingModel = createFormModel(
  notificationsInitialState
)

addPersist(
  notificationsSettingModel.$store,
  DbFields.NOTIFICATIONS_ENABLED
).onInit(({ result }) => {
  if (result) notificationsSettingModel.set(result)
})
