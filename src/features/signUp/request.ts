import { attach } from 'effector'
import moment from 'moment'
import { api } from '../../api'
import { apiManager } from '../../api/apiManager'
import { USER_DOB_FORMAT } from '../../constants'
import { signUpCountryModel } from './country/model'
import { signUpPasswordsFormModel } from './model.passwords'
import { phoneInputModel } from './phone'
import { signUpUserDataFormModel } from './userData/model'

export const signUp = attach({
  source: {
    user: signUpUserDataFormModel.$store,
    phone: phoneInputModel.purePhoneModel.$state,
    country: signUpCountryModel.$state,
    passwords: signUpPasswordsFormModel.$store,
  },
  mapParams: (_: void, { user, country, phone, passwords }) => ({
    first_name: user.name,
    last_name: user.lastName,
    DOB: moment(user.birthDate.valueOf()).format(USER_DOB_FORMAT),
    email: user.email,
    country: country.alpha2Code,
    password: passwords.password,
    phone_number: phone,
    is_manager: false,
    is_superuser: false,
  }),
  effect: api.users.signUp,
})

signUp.done.watch(({ result }) => {
  apiManager.token.set({
    access: result.tokens.access_token,
    refresh: result.tokens.refresh_token,
  })
})
