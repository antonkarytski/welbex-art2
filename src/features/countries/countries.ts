import { ICountry } from './types'

export enum Country {
  RU = 'RU',
}

export const COUNTIES_LIST: Record<Country, ICountry> = {
  [Country.RU]: {
    fullName: 'Russia',
    flag: '🇷🇺',
  },
}
