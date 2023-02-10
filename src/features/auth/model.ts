import { createEvent, restore } from 'effector'

export const resetIsAuth = createEvent()
export const setIsAuth = createEvent<boolean>()
export const $isAuth = restore(setIsAuth, false).reset(resetIsAuth)
