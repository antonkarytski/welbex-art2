import { attach } from 'effector'
import { api } from '../../api'
import { passwordModel } from '../auth/password/model.passwords'
import { userCountrySignUpModel } from './country/model'
import { phoneInputModel } from './phone'
import { userDataSignUpFormModel } from './userData/model'

export const signUp = attach({
  source: {
    user: userDataSignUpFormModel.$store,
    country: userCountrySignUpModel.$state,
    phone_number: phoneInputModel.purePhoneModel.$state,
    passwords: passwordModel.$store,
  },
  mapParams: (_: void, { user, country, phone_number, passwords }) => ({
    first_name: user.name,
    last_name: user.lastName,
    DOB: user.birthDate.toISOString(),
    email: user.email,
    country: country.name,
    password: passwords.password,
    phone_number,
    is_manager: false,
    is_superuser: false,
  }),
  effect: api.users.signUp,
})
