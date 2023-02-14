import { sample } from 'effector'
import { createPhoneInputModel } from '../../../lib/models/phoneNumber/model.phoneNumber'
import { createCountryModel } from '../../countries/model.countriesDropdown'
import { userCountrySignUpModel } from '../country/model'

export const phoneInputModel = createPhoneInputModel()
export const phoneCountryModel = createCountryModel()

sample({
  clock: userCountrySignUpModel.set,
  source: {
    profileCountry: userCountrySignUpModel.$state,
    country: phoneInputModel.purePhoneModel.$state,
  },
  filter: ({ country }) => !country,
  fn: ({ profileCountry }) => profileCountry,
  target: phoneCountryModel.set,
})
