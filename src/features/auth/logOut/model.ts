import { createEvent } from 'effector'
import { apiManager } from '../../../api/apiManager'
import { db } from '../../../lib/db'
import { noop } from '../../../lib/helpers'
import { logInFormModel } from '../logIn/model'

export const logOut = createEvent()

async function cleanDb() {
  const isOnboardWasShown = await db.get(db.fields.ONBOARD_WAS_SHOWN)
  await db.clear()
  if (isOnboardWasShown !== undefined) {
    db.setSync(db.fields.ONBOARD_WAS_SHOWN, isOnboardWasShown)
  }
}

logOut.watch(() => {
  cleanDb().catch(noop)
  apiManager.token.reset()
  logInFormModel.reset()
})
