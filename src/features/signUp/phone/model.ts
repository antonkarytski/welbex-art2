import { sample } from 'effector'
import { createPhoneInputModel } from '../../../lib/models/phoneNumber/model.phoneNumber'
import { createCountryModel } from '../../countries/model.countriesDropdown'
import { userCountrySignUpModel } from '../country/model'

export const phoneInputModel = createPhoneInputModel()
export const phoneCountryModel = createCountryModel()

sample({
  clock: userCountrySignUpModel.$state,
  source: phoneInputModel.purePhoneModel.$state,
  fn: (phone, country) => ({ phone, country }),
}).watch(({ phone, country }) => {
  if (phone) return
  phoneCountryModel.set(country)
})
