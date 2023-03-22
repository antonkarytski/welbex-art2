import { sample } from 'effector'
import { createPhoneEnterModel } from '../../phoneEnter/model'
import { signUpCountryModel } from '../country/model'

export const signUpPhoneModel = createPhoneEnterModel()

sample({
  clock: signUpCountryModel.$state,
  source: signUpPhoneModel.$phoneNumber,
  fn: (phone, country) => ({ phone, country }),
}).watch(({ phone, country }) => {
  if (phone) return
  signUpPhoneModel.setCountry(country)
})
