import { Effect, attach, createEffect } from 'effector'
import { $isAuth } from './model'

type Request<P, R> = Effect<P, R, Error>

export const checkRequestProtection = <P, R>(
  request: Request<P, R>,
  protectedRequest: Request<P, R>
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
