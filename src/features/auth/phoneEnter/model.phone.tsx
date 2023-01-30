import { sample } from 'effector'
import { createPhoneInputModel } from '../../../lib/componentsModels/phoneNumber/model.phoneNumber'
import { createCountryModel } from '../../countries/model.countriesDropdown'
import { profileCountryModel } from '../model.profileCountry'

export const phoneInputModel = createPhoneInputModel()
export const phoneCountryModel = createCountryModel()

sample({
  clock: profileCountryModel.set,
  source: {
    profileCountry: profileCountryModel.$state,
    country: phoneInputModel.purePhoneModel.$state,
  },
  filter: ({ country }) => !country,
  fn: ({ profileCountry }) => profileCountry,
  target: phoneCountryModel.set,
})
