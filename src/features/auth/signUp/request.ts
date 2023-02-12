import { attach, createEffect } from 'effector'
import { api } from '../../../api'
import { SignUpBody } from '../../../api/parts/users/types'
import { profileCountryModel } from '../model.profileCountry'
import { passwordModel } from '../password/model.passwords'
import { phoneInputModel } from '../phoneEnter'
import { signUpFormModel } from './model'

export const signUp = attach({
  source: {
    user: signUpFormModel.$store,
    country: profileCountryModel.$state,
    phone_number: phoneInputModel.purePhoneModel.$state,
    passwords: passwordModel.$store,
  },
  mapParams: (
    _: void,
    { user, country, phone_number, passwords }
  ): SignUpBody => ({
    first_name: user.name,
    last_name: user.lastName,
    DOB: user.birthDate,
    email: user.email,
    country: country.name,
    password: passwords.password,
    phone_number,
    is_manager: false,
    is_superuser: false,
  }),
  effect: api.users.signUp,
})
