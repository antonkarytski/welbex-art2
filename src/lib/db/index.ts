import { AsyncDbManager } from 'altek-toolkit'
import { Languages } from '../../translations/types'
import { DbFields } from './fields'

type CameraProps = {
  ratio: string
  offsetWidth: number
  k: number
}

export type DeterminedDbProps = {
  [DbFields.NOTIFICATIONS_ENABLED]: number
  [DbFields.LANGUAGE]: Languages
}

export type DbProps = Record<
  Exclude<DbFields, keyof DeterminedDbProps>,
  string
> &
  DeterminedDbProps

export const db = new AsyncDbManager<typeof DbFields, DbProps>(DbFields)
