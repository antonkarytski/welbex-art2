import { sample } from 'effector'
import { createSearchableListModel } from '../../../lib/models/model.search'
import { createPhoneInputModel } from '../../../lib/models/phoneNumber/model.phoneNumber'
import { countyNameExtractor } from '../../countries'
import { createCountryModel } from '../../countries/model.countriesDropdown'
import { signUpCountryModel } from '../country/model'

export const phoneInputModel = createPhoneInputModel()
export const phoneCountryModel = createCountryModel()
export const searchCountryModel = createSearchableListModel({
  filterExtractor: countyNameExtractor,
})

sample({
  clock: signUpCountryModel.$state,
  source: phoneInputModel.purePhoneModel.$state,
  fn: (phone, country) => ({ phone, country }),
}).watch(({ phone, country }) => {
  if (phone) return
  phoneCountryModel.set(country)
})
