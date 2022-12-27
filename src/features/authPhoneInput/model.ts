import { attach, createEffect, createEvent, restore } from 'effector'
import { StateModel } from 'altek-toolkit'
// import { validatePhoneRequest } from '../../lib/auth/request.validatePhone'
import { phoneSetMiddleware, phoneValidateMiddleware } from './helpers'
import { phoneValidateFailedModel } from './model.phoneValidateError'

const setAuthPhoneWithConverting = createEvent<string>()
const setAuthPhone = createEvent<string>()
const $authPhoneInputValue = restore(setAuthPhone, '').on(
  setAuthPhoneWithConverting,
  (_, value) => {
    return phoneSetMiddleware(value)
  }
)

export const authPhoneInputModel: StateModel<string> = {
  $state: $authPhoneInputValue,
  set: setAuthPhoneWithConverting,
}

$authPhoneInputValue.watch(() => {
  phoneValidateFailedModel.set(false)
})

export const validatePhone = attach({
  source: $authPhoneInputValue,
  mapParams: (_: void, phone) => ({ phone }),
  effect: createEffect(({ phone }: { phone: string }) => {
    const validPhone = phoneValidateMiddleware(phone)
    setAuthPhone(validPhone)
    // return validatePhoneRequest(`+${validPhone}`)
    return `+${validPhone}`
  }),
})
