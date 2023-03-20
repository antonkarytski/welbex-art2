import { attach, createEffect } from 'effector'
import { api } from '../../api'
import { UserShort } from '../../api/parts/users/types'
import { $isAuth } from '../auth/model'

type GetUserRequestProps = {
  id: number
  isAuth: boolean
}

export const getUserRequest = attach({
  source: $isAuth,
  mapParams: (id: number, isAuth) => ({ id, isAuth }),
  effect: createEffect(({ id, isAuth }: GetUserRequestProps) =>
    isAuth ? api.users.profileProtected(id) : api.users.profile(id)
  ),
})

export const toggleFollow = (user: UserShort) => {
  const request = user.is_followed ? api.users.unfollow : api.users.follow
  return request(user.id)
}
