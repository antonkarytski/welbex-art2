import { createEffect } from 'effector'
import { USERS_FULL } from '../../../_mock/users'
import { UserShort } from '../../../api/parts/users/types'

export const getUserExt = createEffect((user: UserShort) => {
  return USERS_FULL.find(({ id }) => user.id)
})
