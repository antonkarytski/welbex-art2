import { addStorePersist } from 'altek-toolkit'
import { DbFields } from '../../../lib/db/fields'
import { createFormModel } from '../../../lib/models/form/model.form'
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

export const NOTIFICATIONS_NAMES = Object.values(NotificationType)

export const NOTIFICATIONS_DESCRIPTORS: NotificationSwitchDescriptor[] =
  NOTIFICATIONS_NAMES.map((name) => ({
    name,
    label: (text) => text[name],
  }))

export const notificationsSettingModel = createFormModel(
  notificationsInitialState
)

addStorePersist({
  $store: notificationsSettingModel.$store,
  saveTo: DbFields.NOTIFICATIONS_ENABLED,
}).onInit((result) => {
  if (result) notificationsSettingModel.set(result)
})
