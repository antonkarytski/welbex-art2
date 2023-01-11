import { createEffect } from 'effector'
import { USERS_FULL } from '../../_mock/users'
import { User } from './types'

export const getUserExt = createEffect((user: User) => {
  return USERS_FULL.find(({ id }) => user.id)
})
