import { createStateModel } from 'altek-toolkit'
import { createSearchableListModel } from '../../lib/models/model.search'
import {
  COUNTRIES,
  Country,
  CountryCode,
  DEFAULT_COUNTRY,
  countyNameExtractor,
} from './'

export const createCountryModel = () => {
  const countryModel = createStateModel<null | Country>(DEFAULT_COUNTRY)

  const searchableListModel = createSearchableListModel({
    filterExtractor: countyNameExtractor,
  })

  const setCountry = (country: CountryCode | Country) => {
    if (typeof country === 'string') {
      return countryModel.set(COUNTRIES[country])
    }
    countryModel.set(country)
  }

  const reset = () => {
    countryModel.set(null)
    searchableListModel.searchStringModel.set('')
  }

  return {
    countryModel,
    $country: countryModel.$state,
    searchableListModel,
    reset,
    setCountry,
  }
}

export const createCountriesListModel = () => {
  const countriesModel = createStateModel<Country[]>([])

  const searchableListModel = createSearchableListModel({
    filterExtractor: countyNameExtractor,
  })

  const reset = () => {
    countriesModel.set([])
    searchableListModel.searchStringModel.set('')
  }

  return {
    countriesModel,
    searchableListModel,
    $countries: countriesModel.$state,
    reset,
  }
}
