import { Country } from './types'

export const countyNameExtractor = ({ name, nativeName }: Country) =>
  `${name} ${nativeName}`
