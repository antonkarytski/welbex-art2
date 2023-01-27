import { createStateModel } from 'altek-toolkit'
import { COUNTRIES_LIST } from './'

export const createCountryModel = () => createStateModel(COUNTRIES_LIST[0])
