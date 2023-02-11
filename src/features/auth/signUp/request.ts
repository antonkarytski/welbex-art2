import { attach, combine, createEffect, createEvent, restore } from 'effector'
import { User, api } from '../../../api/endpoints'
import { apiManager } from '../../../api/requests'
import { profileCountryModel } from '../model.profileCountry'
import { passwordModel } from '../password/model.passwords'
import { phoneInputModel } from '../phoneEnter/model.phone'
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
  })
)

export const signUpRequest = attach({
  source: $signUpParams,
  mapParams: (_: void, source) => source,
  effect: createEffect(), // TODO: requestManager.createRequestEffect({})
})
