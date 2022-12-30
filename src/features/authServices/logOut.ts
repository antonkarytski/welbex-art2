import { createEvent } from 'effector'
import { setIsAuth } from './model'

export const logOut = createEvent()

logOut.watch(() => {
  setIsAuth(false)
})
