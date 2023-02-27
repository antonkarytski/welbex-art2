import { createStateModel } from 'altek-toolkit'
import { createSearchableListModel } from '../../lib/models/model.search'
import { Country, DEFAULT_COUNTRY, countyNameExtractor } from './'

export const createCountryModel = () =>
  createStateModel<null | Country>(DEFAULT_COUNTRY)

export const createSearchCountryModel = () =>
  createSearchableListModel({ filterExtractor: countyNameExtractor })
