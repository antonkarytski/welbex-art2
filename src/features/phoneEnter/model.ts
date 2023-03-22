import { createPhoneInputModel } from '../../lib/models/phoneNumber/model.phoneNumber'
import { createSearchableCountriesListModel } from '../countries/model.countriesDropdown'

export const createPhoneEnterModel = () => {
  const phoneInputModel = createPhoneInputModel()
  const { countryModel, searchableListModel } =
    createSearchableCountriesListModel()

  const setPhone = (phone: string) => {
    phoneInputModel.purePhoneModel.set(phone)
  }

  return {
    phoneInputModel,
    phoneCountryModel: countryModel,
    searchCountryModel: searchableListModel,
    $phoneNumber: phoneInputModel.purePhoneModel.$state,
    setPhone,
  }
}
