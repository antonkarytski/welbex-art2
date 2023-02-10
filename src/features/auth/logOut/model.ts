import { createEvent, createStore } from 'effector'
import { db } from '../../../lib/db'
import { resetUserProfile } from '../../profile/model'
import { resetIsAuth } from '../model'

// import { clearToken } from '../token/model'

export const logOut = createEvent()

logOut.watch(() => {
  resetIsAuth()
  resetUserProfile()
  db.clear()
  // clearToken()
})

export const setShouldLogOut = createEvent()
export const resetLogOutFlag = createEvent()

export const $logOutFlag = createStore(false)
  .on(setShouldLogOut, () => true)
  .reset(resetLogOutFlag)

$logOutFlag.watch((shouldLogOut) => {
  if (!shouldLogOut) return
  logOut()
  resetLogOutFlag()
})
