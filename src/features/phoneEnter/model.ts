import { createPhoneInputModel } from '../../lib/models/phoneNumber/model.phoneNumber'
import { COUNTRIES, Country, CountryCode } from '../countries'
import { createCountryModel } from '../countries/model.countriesDropdown'

export const createPhoneEnterModel = () => {
  const phoneInputModel = createPhoneInputModel()
  const { countryModel, searchableListModel } = createCountryModel()

  const setPhone = (phone: string) => {
    phoneInputModel.purePhoneModel.set(phone)
  }

  const setCountry = (country: CountryCode | Country | null) => {
    if (typeof country === 'string') {
      return countryModel.set(COUNTRIES[country])
    }
    countryModel.set(country)
  }

  return {
    phoneInputModel,
    phoneCountryModel: countryModel,
    searchCountryModel: searchableListModel,
    $phoneNumber: phoneInputModel.purePhoneModel.$state,
    $isValidPhoneNumber: phoneInputModel.$isPhoneValid,
    setPhone,
    setCountry,
  }
}
