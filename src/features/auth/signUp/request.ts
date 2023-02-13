import { attach, combine } from 'effector'
import { api } from '../../../api'
import { profileCountryModel } from '../model.profileCountry'
import { passwordModel } from '../password/model.passwords'
import { phoneInputModel } from '../phoneEnter'
import { birthDateModel, signUpFormModel } from './model'

const $signUpParams = combine(
  {
    user: signUpFormModel.$store,
    country: profileCountryModel.$state,
    phone_number: phoneInputModel.purePhoneModel.$state,
    passwords: passwordModel.$store,
    birthDate: birthDateModel.$state,
  },
  ({ user, country, phone_number, passwords, birthDate }) => ({
    first_name: user.name,
    last_name: user.lastName,
    DOB: birthDate.toISOString(),
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
  effect: api.users.signUp,
})
