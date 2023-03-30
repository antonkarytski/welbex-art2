import { Effect, attach, createEffect } from 'effector'
import { $isAuth } from './model'

export const createAuthSeparatedRequest = <P, R>(
  request: Effect<P, R>,
  protectedRequest: Effect<P, R>
) =>
  attach({
    source: $isAuth,
    mapParams: (params: P, isAuth) => ({ params, isAuth }),
    effect: createEffect(
      ({ params, isAuth }: { params: P; isAuth: boolean }) => {
        if (isAuth) return protectedRequest(params)
        return request(params)
      }
    ),
  })
