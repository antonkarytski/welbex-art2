import { createEffect, createEvent, createStore } from 'effector'
import moment from 'moment'
import { db } from '../../../lib/db'
import { DbFields } from '../../../lib/db/fields'

export const renewLocalToken = createEffect(async (token: string) => {
  return Promise.all([
    await db.set(DbFields.TOKEN_START_TIME, moment().format()),
    await db.set(DbFields.TOKEN, token),
  ])
})
