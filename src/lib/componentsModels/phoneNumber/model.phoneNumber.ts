import { Store, createEvent, createStore, sample } from 'effector'
import { CountryCode } from 'libphonenumber-js'
import { StateModel } from 'altek-toolkit'
import { formatPhone, purifyPhone } from './helpers/formatPhone'
import { validatePhone } from './helpers/validatePhone'

export type PhoneInputModel = {
  purePhoneModel: StateModel<string>
  $formattedPhone: Store<string>
  countryCodeModel: StateModel<CountryCode | null>
  $isPhoneValid: Store<boolean>
}

type CheckPhoneEventParams = {
  purePhone: string
  countryCode: CountryCode | null
}

export const createPhoneInputModel = (
  defaultCountryCode?: CountryCode
): PhoneInputModel => {
  const setCountryCode = createEvent<CountryCode | null>()
  const $countryCode = createStore<CountryCode | null>(
    defaultCountryCode || null
  ).on(setCountryCode, (_, code) => code)

  const setPurePhone = createEvent<string>()
  const $purePhone = createStore('').on(setPurePhone, (_, phone) =>
    purifyPhone(phone)
  )

  const setFormattedPhone = createEvent<CheckPhoneEventParams>()
  const $formattedPhone = createStore('').on(
    setFormattedPhone,
    (_, { purePhone, countryCode }) => formatPhone(purePhone, countryCode)
  )

  const setIsPhoneValidModel = createEvent<CheckPhoneEventParams>()
  const $isPhoneValid = createStore(true).on(
    setIsPhoneValidModel,
    (_, { purePhone, countryCode }) => validatePhone(purePhone, countryCode)
  )

  sample({
    clock: [setPurePhone, setCountryCode],
    source: {
      purePhone: $purePhone,
      countryCode: $countryCode,
    },
    target: [setFormattedPhone, setIsPhoneValidModel],
  })

  const purePhoneModel = {
    $state: $purePhone,
    set: setPurePhone,
  }

  const countryCodeModel = {
    $state: $countryCode,
    set: setCountryCode,
  }

  return {
    purePhoneModel,
    $formattedPhone,
    countryCodeModel,
    $isPhoneValid,
  }
}
