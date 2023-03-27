import { Store, combine, createEvent, createStore, restore } from 'effector'
import { StateModel } from 'altek-toolkit'
import { CountryCode } from '../../../features/countries'
import { formatPhone, purifyPhone } from './helpers/formatPhone'
import { validatePhone } from './helpers/validatePhone'

export type PhoneInputModel = {
  purePhoneModel: StateModel<string>
  $formattedPhone: Store<string>
  countryCodeModel: StateModel<CountryCode | null>
  $isPhoneValid: Store<boolean>
}

export const createPhoneInputModel = (
  defaultCountryCode?: CountryCode
): PhoneInputModel => {
  const setCountryCode = createEvent<CountryCode | null>()
  const $countryCode = restore<CountryCode | null>(
    setCountryCode,
    defaultCountryCode || null
  )

  const setPurePhone = createEvent<string>()
  const $purePhone = createStore('').on(setPurePhone, (_, phone) =>
    purifyPhone(phone)
  )

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
    reset: () => setPurePhone(''),
  }

  const countryCodeModel = {
    $state: $countryCode,
    set: setCountryCode,
    reset: () => setCountryCode(defaultCountryCode || null),
  }

  return {
    purePhoneModel,
    $formattedPhone,
    countryCodeModel,
    $isPhoneValid,
  }
}
