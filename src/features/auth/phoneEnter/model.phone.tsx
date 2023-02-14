import { sample } from 'effector'
import { createSearchableListModel } from '../../../lib/models/model.search'
import { createPhoneInputModel } from '../../../lib/models/phoneNumber/model.phoneNumber'
import { countyNameExtractor } from '../../countries/helpers'
import { createCountryModel } from '../../countries/model.countriesDropdown'
import { profileCountryModel } from '../model.profileCountry'

export const phoneInputModel = createPhoneInputModel()
export const phoneCountryModel = createCountryModel()
export const searchCountryModel = createSearchableListModel({
  filterExtractor: countyNameExtractor,
})

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
