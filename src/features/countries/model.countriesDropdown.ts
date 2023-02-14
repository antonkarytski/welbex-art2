import { createStateModel } from 'altek-toolkit'
import { createSearchableListModel } from '../../lib/models/model.search'
import { DEFAULT_COUNTRY, countyNameExtractor } from './'

export const createCountryModel = () => createStateModel(DEFAULT_COUNTRY)

export const createSearchCountryModel = () =>
  createSearchableListModel({ filterExtractor: countyNameExtractor })
