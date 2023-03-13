import { createStateModel } from 'altek-toolkit'
import { Country, DEFAULT_COUNTRY } from '../../countries'

export const signUpCountryModel = createStateModel<Country | null>(
  DEFAULT_COUNTRY
)
