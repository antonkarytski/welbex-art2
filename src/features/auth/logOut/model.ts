import { createEvent } from 'effector'
import { apiManager } from '../../../api/apiManager'
import { db } from '../../../lib/db'
import { logInFormModel } from '../logIn/model'

export const logOut = createEvent()

logOut.watch(() => {
  db.clear()
  apiManager.token.reset()
  logInFormModel.reset()
})
