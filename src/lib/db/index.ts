import { AsyncDbManager } from 'altek-toolkit'
import { NotificationsSetting } from '../../features/settings/notifications/model.notificationsSetting'
import { Languages } from '../../translations/types'
import { DbFields } from './fields'

type CameraProps = {
  ratio: string
  offsetWidth: number
  k: number
}

export type DeterminedDbProps = {
  [DbFields.NOTIFICATIONS_ENABLED]: NotificationsSetting
  [DbFields.LANGUAGE]: Languages
}

export type DbProps = Record<
  Exclude<DbFields, keyof DeterminedDbProps>,
  string
> &
  DeterminedDbProps

export const db = new AsyncDbManager<typeof DbFields, DbProps>(DbFields)
