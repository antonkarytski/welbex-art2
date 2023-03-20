import { createSearchableListModel } from '../../lib/models/model.search'
import { createPhoneInputModel } from '../../lib/models/phoneNumber/model.phoneNumber'
import { countyNameExtractor } from '../countries'
import { createCountryModel } from '../countries/model.countriesDropdown'

export const createPhoneEnterModel = () => {
  const phoneInputModel = createPhoneInputModel()
  const phoneCountryModel = createCountryModel()
  const searchCountryModel = createSearchableListModel({
    filterExtractor: countyNameExtractor,
  })
  return {
    phoneInputModel,
    phoneCountryModel,
    searchCountryModel,
  }
}
