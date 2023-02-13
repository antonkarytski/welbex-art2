import { createEvent, restore } from 'effector'
import { logOut } from './logOut/model'

export const setIsAuth = createEvent<boolean>()
export const $isAuth = restore(setIsAuth, false).reset(logOut)
