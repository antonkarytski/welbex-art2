import { attach, combine, createEffect } from 'effector'
import { api } from '../../../api/api'
import { profileCountryModel } from '../model.profileCountry'
import { passwordModel } from '../password/model.passwords'
import { phoneInputModel } from '../phoneEnter'
import { signUpFormModel } from './model'

const $signUpParams = combine({
  user: signUpFormModel.$store,
  country: profileCountryModel.$state,
  phone_number: phoneInputModel.purePhoneModel.$state,
  passwords: passwordModel.$store,
}).map(({ user, country, phone_number, passwords }) =>
  api.signUp({
    first_name: user.name,
    last_name: user.lastName,
    DOB: user.birthDate,
    email: user.email,
    country: country.name,
    password: passwords.password,
    phone_number,
    is_manager: false,
    is_superuser: false,
  })
)

export const signUpRequest = attach({
  source: $signUpParams,
  mapParams: (_: void, source) => source,
  effect: createEffect(), // TODO: requestManager.createRequestEffect({})
})
