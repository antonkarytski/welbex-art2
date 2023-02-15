import { createEvent } from 'effector'
import { apiManager } from '../../../api/apiManager'
import { db } from '../../../lib/db'

export const logOut = createEvent()

logOut.watch(() => {
  db.clear()
  apiManager.token.reset()
})
