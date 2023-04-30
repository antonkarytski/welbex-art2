import { Effect, attach, createEffect } from 'effector'
import { openBrowserAsync } from 'expo-web-browser'
import { PRIVACY_POLICY_LINK, USER_AGREEMENT_LINK } from '../../constants/app'
import { noop } from '../../lib/helpers'
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

export const openUserAgreement = () => {
  openBrowserAsync(USER_AGREEMENT_LINK).catch(noop)
}
export const openPrivacyPolicy = () => {
  openBrowserAsync(PRIVACY_POLICY_LINK).catch(noop)
}
