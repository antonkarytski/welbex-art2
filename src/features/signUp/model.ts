import { combine } from 'effector'
import { PasswordsFormModel } from '../../lib/models/passwordsForm/types'
import { Country } from '../countries'
import { signUpCountryModel } from './country/model'
import { signUpPasswordsFormModel } from './model.passwords'
import { signUpPhoneModel } from './phone/model'
import { signUpUserDataFormModel } from './userData/model'
import { SignUpUserDataForm } from './userData/types'

export const $signUpFormData = combine({
  user: signUpUserDataFormModel.$store,
  phone: signUpPhoneModel.$phoneNumber,
  country: signUpCountryModel.$state,
  passwords: signUpPasswordsFormModel.$store,
})

export const resetSignUpFormData = () => {
  signUpUserDataFormModel.reset()
  signUpPhoneModel.reset()
  signUpCountryModel.reset()
  signUpPasswordsFormModel.reset()
}

export type SignUpFormData = {
  user: SignUpUserDataForm
  country: Country | null
  phone: string
  passwords: PasswordsFormModel
}
