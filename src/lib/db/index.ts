import { AsyncDbManager } from 'altek-toolkit'
import { NotificationsSetting } from '../../features/settings/notifications/model.notificationsSetting'
import { Languages } from '../../translations/types'
import { DbFields } from './fields'
import { UserCredits } from './types'

export type DeterminedDbProps = {
  [DbFields.NOTIFICATIONS_ENABLED]: NotificationsSetting
  [DbFields.LANGUAGE]: Languages
  [DbFields.USER_CREDITS]: UserCredits
  [DbFields.ONBOARD_WAS_SHOWN]: boolean
}

export type DbProps = Record<
  Exclude<DbFields, keyof DeterminedDbProps>,
  string
> &
  DeterminedDbProps

export const db = new AsyncDbManager<typeof DbFields, DbProps>(DbFields)
