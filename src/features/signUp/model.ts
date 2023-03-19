import { combine } from 'effector'
import { PasswordsFormModel } from '../../lib/models/passwordsForm/model'
import { Country } from '../countries'
import { signUpCountryModel } from './country/model'
import { signUpPasswordsFormModel } from './model.passwords'
import { phoneInputModel } from './phone'
import { signUpUserDataFormModel } from './userData/model'
import { SignUpUserDataForm } from './userData/types'

export const $signUpFormData = combine({
  user: signUpUserDataFormModel.$store,
  phone: phoneInputModel.purePhoneModel.$state,
  country: signUpCountryModel.$state,
  passwords: signUpPasswordsFormModel.$store,
})

export type SignUpFormData = {
  user: SignUpUserDataForm
  country: Country | null
  phone: string
  passwords: PasswordsFormModel
}
