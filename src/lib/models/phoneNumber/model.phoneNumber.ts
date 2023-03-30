import { Store, combine, createEvent, createStore, restore } from 'effector'
import { StateModel } from 'altek-toolkit'
import { CountryCode } from '../../../features/countries'
import { formatPhone, purifyPhone } from './helpers/formatPhone'
import { validatePhone } from './helpers/validatePhone'

export type PhoneInputModel = {
  purePhoneModel: StateModel<string>
  $phone: Store<string>
  $formattedPhone: Store<string>
  countryCodeModel: StateModel<CountryCode | null>
  $isPhoneValid: Store<boolean>
  reset: () => void
}

export const createPhoneInputModel = (
  defaultCountryCode?: CountryCode
): PhoneInputModel => {
  const setCountryCode = createEvent<CountryCode | null>()
  const resetCountryCode = createEvent()
  const $countryCode = restore<CountryCode | null>(
    setCountryCode,
    defaultCountryCode || null
  ).reset(resetCountryCode)

  const setPurePhone = createEvent<string>()
  const resetPurePhone = createEvent()
  const $purePhone = createStore('')
    .on(setPurePhone, (_, phone) => purifyPhone(phone))
    .reset(resetPurePhone)

  const $fullPhone = combine({
    purePhone: $purePhone,
    countryCode: $countryCode,
  })

  const $isPhoneValid = $fullPhone.map(({ purePhone, countryCode }) =>
    validatePhone(purePhone, countryCode)
  )
  const $formattedPhone = $fullPhone.map(({ purePhone, countryCode }) =>
    formatPhone(purePhone, countryCode)
  )

  const purePhoneModel = {
    $state: $purePhone,
    set: setPurePhone,
    reset: resetPurePhone,
  }

  const countryCodeModel = {
    $state: $countryCode,
    set: setCountryCode,
    reset: resetCountryCode,
  }

  return {
    purePhoneModel,
    $formattedPhone,
    $phone: purePhoneModel.$state,
    countryCodeModel,
    $isPhoneValid,
    reset: resetPurePhone,
  }
}
