import { createSearchableListModel } from '../../../lib/models/model.search'
import { countyNameExtractor } from '../../countries/helpers'

export const searchCountryModel = createSearchableListModel({
  filterExtractor: countyNameExtractor,
})
