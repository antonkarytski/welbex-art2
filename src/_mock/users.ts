import { Country } from '../features/countries/countries'
import { User } from '../features/user/types'

export const romanov: User = {
  avatar: require('../../assets/images/avatar.png'),
  country: Country.RU,
  name: 'Sergey Romanov',
  age: 10,
}

export const reginaRomanova: User = {
  avatar: require('../../assets/images/avatar.png'),
  name: 'Regina Romanova',
  country: Country.RU,
  age: 10,
}
